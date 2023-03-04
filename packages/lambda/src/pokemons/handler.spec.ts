import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { pokemonHandler } from "./handler";
import { getPokemonById, getPokemonNamesAndUrls } from "./query";
import { IDBPokemon, IDBPokemonNamesAndUrls } from "./types";

jest.mock("./query");

describe("pokemonHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPokemonById()", () => {
    const dummyPokemonId = "0001";
    const dummyPokemonParam: APIGatewayProxyEventQueryStringParameters = {
      id: dummyPokemonId,
    };
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
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyPokemon,
      }),
    };

    it("should succesfully return expected result when pokemon exist", async () => {
      (getPokemonById as jest.Mock).mockResolvedValue(dummyPokemon);
      const result = await pokemonHandler(dummyPokemonParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pokemon not exist", async () => {
      (getPokemonById as jest.Mock).mockResolvedValue(undefined);
      const dummyInvalidDataResult = {
        ...dummyResult,
        body: JSON.stringify({
          status: "ok",
          data: {},
        }),
      };

      const result = await pokemonHandler(dummyPokemonParam);

      expect(result).toStrictEqual(dummyInvalidDataResult);
    });

    it("should return status 400 when pokemon not found", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Pokemon not found",
      };

      const result = await pokemonHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });

  describe("getPokemonNamesAndUrls()", () => {
    const dummyLimit = "0";
    const dummyPokemonParam: APIGatewayProxyEventQueryStringParameters = {
      limit: dummyLimit,
    };
    const dummyPokemons: IDBPokemonNamesAndUrls[] = [
      { name: "azumarill", url: "/0003.png" },
      { name: "absol", url: "/0001.png" },
    ];
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyPokemons,
      }),
    };

    it("should succesfully return expected result when pokemon exist", async () => {
      (getPokemonNamesAndUrls as jest.Mock).mockResolvedValue(dummyPokemons);
      const result = await pokemonHandler(dummyPokemonParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pokemon not exist", async () => {
      (getPokemonNamesAndUrls as jest.Mock).mockResolvedValue(undefined);
      const dummyInvalidDataResult = {
        ...dummyResult,
        body: JSON.stringify({
          status: "ok",
          data: {},
        }),
      };

      const result = await pokemonHandler(dummyPokemonParam);

      expect(result).toStrictEqual(dummyInvalidDataResult);
    });
  });
});
