import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { emblemHandler } from "./handler";
import { getEmblemById } from "./query";
import { IDBEmblem } from "./types";

jest.mock("./query");

describe("emblemHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getEmblemById()", () => {
    const dummyPokemon = "venusaur";
    const dummyType = "bronze";
    const dummyEmblemParam: APIGatewayProxyEventQueryStringParameters = {
      pokemon: dummyPokemon,
      type: dummyType,
    };
    const dummyEmblem: IDBEmblem = {
      pk: `pokemon:${dummyPokemon}`,
      color: "green",
      attack: "-1.2",
      special_attack: "1.8",
      url: "https://example.com",
    };
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyEmblem,
      }),
    };

    it("should succesfully return expected result when pokemon and type exist", async () => {
      (getEmblemById as jest.Mock).mockResolvedValue(dummyEmblem);
      const result = await emblemHandler(dummyEmblemParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pokemon and type not exist", async () => {
      (getEmblemById as jest.Mock).mockResolvedValue(undefined);
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
        body: "Emblem id not provided",
      };

      const result = await emblemHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
