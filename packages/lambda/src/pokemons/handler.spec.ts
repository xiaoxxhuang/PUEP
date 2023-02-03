import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { pokemonHandler } from "./handler";
import { getPokemonStatsByName } from "./query";
import { IDBPokemon } from "./types";

jest.mock("./query");

describe("pokemonHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getPokemonStatsByName()", () => {
    const dummyPokemonName = "venusaur";
    const dummyType = "bronze";
    const dummyPokemonParam: APIGatewayProxyEventQueryStringParameters = {
      name: dummyPokemonName,
      type: dummyType,
    };
    const dummyPokemon: IDBPokemon = {
      pk: `name:${dummyPokemonName}`,
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
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyPokemon,
      }),
    };

    it("should succesfully return expected result when pokemon and type exist", async () => {
      (getPokemonStatsByName as jest.Mock).mockResolvedValue(dummyPokemon);
      const result = await pokemonHandler(dummyPokemonParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pokemon and type not exist", async () => {
      (getPokemonStatsByName as jest.Mock).mockResolvedValue(undefined);
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

    it("should return not found when pokemon and type not provided", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Name and Type not provided",
      };

      const result = await pokemonHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
