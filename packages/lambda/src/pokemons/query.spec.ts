import { getPokemonById, getPokemonNamesAndUrls } from "./query";
import { Utils } from "../utils";
import { IDBPokemon, IDBPokemonNamesAndUrls } from "./types";

jest.mock("aws-sdk");
jest.mock("../utils");

describe("Dynamodb query", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (Utils.getTableName as jest.Mock).mockResolvedValue("puep_table");
  });

  describe("getPokemonById()", () => {
    const dummyPokemonId = "0001";
    const dummyPokemon: IDBPokemon = {
      pk: `pokemon:${dummyPokemonId}`,
      damageType: "physical",
      difficulty: "novice",
      evolution: [],
      name: "azumarill",
      range: "melee",
      role: "all-rounder",
      url: "/0001.png",
      stats: [],
    };

    it("shoud successfully get pokemon details by id", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Item: dummyPokemon }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPokemonById(dummyPokemonId);

      expect(result).toStrictEqual(dummyPokemon);
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pokemon:${dummyPokemonId}`,
        },
      });
    });

    it("shoud return undefined when pokemon does not exist", async () => {
      const mockDocumentClient = {
        get: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPokemonById(dummyPokemonId);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pokemon:${dummyPokemonId}`,
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

      const result = await getPokemonById(dummyPokemonId);

      expect(result).toBeUndefined();
      expect(mockDocumentClient.get).toHaveBeenCalledWith({
        TableName: Utils.getTableName(),
        Key: {
          pk: `pokemon:${dummyPokemonId}`,
        },
      });
    });
  });

  describe("getPokemonNamesAndUrls()", () => {
    const dummyPokemons: IDBPokemonNamesAndUrls[] = [
      { pk: "pokemon:0003", name: "azumarill", url: "/0003.png" },
      { pk: "pokemon:0001", name: "absol", url: "/0001.png" },
    ];

    it("shoud successfully get pokemon details by id", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({ Items: dummyPokemons }),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPokemonNamesAndUrls();

      expect(result).toStrictEqual(dummyPokemons);
    });

    it("shoud return undefined when pokemon does not exist", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({}),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPokemonNamesAndUrls();

      expect(result).toBeUndefined();
    });

    it("shoud return undefined when result is undefined", async () => {
      const mockDocumentClient = {
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue(undefined),
      };
      (Utils.getDocumentClient as jest.Mock).mockReturnValue(
        mockDocumentClient
      );

      const result = await getPokemonNamesAndUrls();

      expect(result).toBeUndefined();
    });
  });
});
