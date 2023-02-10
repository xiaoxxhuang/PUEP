import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { emblemHandler } from "./handler";
import { getEmblemByPokemonAndType } from "./query";
import { IDBEmblem } from "./types";

jest.mock("./query");

describe("emblemHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getEmblemByPokemonAndType()", () => {
    const dummyPokemon = "venusaur";
    const dummyType = "bronze";
    const dummyEmblemParam: APIGatewayProxyEventQueryStringParameters = {
      pokemon: dummyPokemon,
      type: dummyType,
    };
    const dummyEmblem: IDBEmblem = {
      pk: `pokemon:${dummyPokemon}`,
      sk: `type:${dummyType}`,
      color: ["green"],
      attack: -1.2,
      special_attack: 1.8,
    };
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyEmblem,
      }),
    };

    it("should succesfully return expected result when pokemon and type exist", async () => {
      (getEmblemByPokemonAndType as jest.Mock).mockResolvedValue(dummyEmblem);
      const result = await emblemHandler(dummyEmblemParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pokemon and type not exist", async () => {
      (getEmblemByPokemonAndType as jest.Mock).mockResolvedValue(undefined);
      const dummyInvalidDataResult = {
        ...dummyResult,
        body: JSON.stringify({
          status: "ok",
          data: {},
        }),
      };

      const result = await emblemHandler(dummyEmblemParam);

      expect(result).toStrictEqual(dummyInvalidDataResult);
    });

    it("should return not found when pokemon and type not provided", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Pokemon and Type not provided",
      };

      const result = await emblemHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
