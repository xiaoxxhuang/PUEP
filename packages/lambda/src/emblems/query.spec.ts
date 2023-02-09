import { getEmblemById } from "./query";
import { Utils } from "../utils";
import { IDBEmblem } from "./types";

jest.mock("aws-sdk");
jest.mock("../utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });
  describe("getEmblemById()", () => {
    const dummyPokemon = "venusaur";
    const dummyEmblem: IDBEmblem = {
      pk: `pokemon:${dummyPokemon}`,
      color: "green",
      attack: "-1.2",
      special_attack: "1.8",
      url: "https//example.com",
    };

    it("shoud successfully get emblem by id", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyEmblem }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemById(dummyPokemon);

      expect(result).toStrictEqual(dummyEmblem);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
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

      const result = await getEmblemById(dummyPokemon);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
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

      const result = await getEmblemById(dummyPokemon);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `emblem:${dummyPokemon}`,
        },
      });
    });
  });
});
