import { getEmblemByPokemonAndType } from "./query";
import { Utils } from "../utils";
import { IDBEmblem } from "./types";

jest.mock("aws-sdk");
jest.mock("../utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });
  describe("getEmblemByPokemonAndType()", () => {
    const dummyPokemon = "venusaur";
    const dummyType = "bronze";
    const dummyEmblem: IDBEmblem = {
      pk: `pokemon:${dummyPokemon}`,
      sk: `type:${dummyType}`,
      color: ["green"],
      attack: -1.2,
      special_attack: 1.8,
    };

    it("shoud successfully get emblem by pokemon and type", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyEmblem }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getEmblemByPokemonAndType(dummyPokemon, dummyType);

      expect(result).toStrictEqual(dummyEmblem);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pokemon:${dummyPokemon}`,
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

      const result = await getEmblemByPokemonAndType(dummyPokemon, dummyType);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pokemon:${dummyPokemon}`,
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
  
        const result = await getEmblemByPokemonAndType(dummyPokemon, dummyType);
  
        expect(result).toBeUndefined();
        expect(mockDocumentClient.get).toHaveBeenCalledWith({
          TableName: Utils.getTableName(),
          Key: {
            pk: `pokemon:${dummyPokemon}`,
            sk: `type:${dummyType}`,
          },
        });
      });
  });
});
