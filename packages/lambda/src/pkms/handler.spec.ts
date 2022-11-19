import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { pkmHandler } from "./handler";
import { getPkmStatsByName } from "./query";
import { IDBPkm } from "./types";

jest.mock("./query");

describe("pkmHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getPkmStatsByName()", () => {
    const dummyPkmName = "venusaur";
    const dummyType = "bronze";
    const dummyPkmParam: APIGatewayProxyEventQueryStringParameters = {
      name: dummyPkmName,
      type: dummyType,
    };
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
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyPkm,
      }),
    };

    it("should succesfully return expected result when pkm and type exist", async () => {
      (getPkmStatsByName as jest.Mock).mockResolvedValue(dummyPkm);
      const result = await pkmHandler(dummyPkmParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pkm and type not exist", async () => {
      (getPkmStatsByName as jest.Mock).mockResolvedValue(undefined);
      const dummyInvalidDataResult = {
        ...dummyResult,
        body: JSON.stringify({
          status: "ok",
          data: {},
        }),
      };

      const result = await pkmHandler(dummyPkmParam);

      expect(result).toStrictEqual(dummyInvalidDataResult);
    });

    it("should return not found when pkm and type not provided", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Name and Type not provided",
      };

      const result = await pkmHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
