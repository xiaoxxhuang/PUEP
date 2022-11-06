import { getEmblemByPkmAndType } from "./query";
import { Utils } from "./utils";
import { IDBEmblem } from "./types";

jest.mock("aws-sdk");
jest.mock("./utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });
  describe("getEmblemByPkmAndType()", () => {
    const dummyPkm = "venusaur";
    const dummyType = "bronze";
    const dummyEmblem: IDBEmblem = {
      pk: `pkm:${dummyPkm}`,
      sk: `type:${dummyType}`,
      color: ["green"],
      attack: -1.2,
      special_attack: 1.8,
    };

    it("shoud successfully get emblem by pkm and type", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyEmblem }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemByPkmAndType(dummyPkm, dummyType);

      expect(result).toStrictEqual(dummyEmblem);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pkm:${dummyPkm}`,
          sk: `type:${dummyType}`,
        },
      });
    });

    it("shoud return undefined when emblem does not exist", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemByPkmAndType(dummyPkm, dummyType);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pkm:${dummyPkm}`,
          sk: `type:${dummyType}`,
        },
      });
    });

    it("shoud return undefined when result is undefined", async () => {
        const mockDocumentClient = {
          get: jest.fn().mockReturnThis(),
          promise: jest.fn().mockResolvedValue(undefined),
        };
        (Utils.getDocumentClient as jest.Mock).mockReturnValue(
          mockDocumentClient
        );
  
        const result = await getEmblemByPkmAndType(dummyPkm, dummyType);
  
        expect(result).toBeUndefined();
        expect(mockDocumentClient.get).toHaveBeenCalledWith({
          TableName: Utils.getTableName(),
          Key: {
            pk: `pkm:${dummyPkm}`,
            sk: `type:${dummyType}`,
          },
        });
      });
  });
});
