import { getPkmStatsByName } from "./query";
import { Utils } from "../utils";
import { IDBPkm } from "./types";

jest.mock("aws-sdk");
jest.mock("../utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });
  describe("getPkmStatsByName()", () => {
    const dummyPkmName = "venusaur";
    const dummyType = "attacker";
    const dummyPkm: IDBPkm = {
      pk: `name:${dummyPkmName}`,
      sk: `type:${dummyType}`,
      attack: 1,
      special_attack: 1,
      attack_speed: 1,
      defense: 1,
      special_defense: 1,
      hp: 1,
      critical_rate: 1,
      cdr: 1,
      lifesteal: 1,
    };

    it("shoud successfully get pkm stats by name", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyPkm }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPkmStatsByName(dummyPkmName, dummyType);

      expect(result).toStrictEqual(dummyPkm);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `name:${dummyPkmName}`,
          sk: `type:${dummyType}`,
        },
      });
    });

    it("shoud return undefined when pkm does not exist", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPkmStatsByName(dummyPkmName, dummyType);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `name:${dummyPkmName}`,
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

      const result = await getPkmStatsByName(dummyPkmName, dummyType);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `name:${dummyPkmName}`,
          sk: `type:${dummyType}`,
        },
      });
    });
  });
});
