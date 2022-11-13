import { lambdaHandler } from "./index";
import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { getEmblemByPkmAndType } from "./query";
import { IDBEmblem } from "./types";

jest.mock("./query");

describe("lambdaHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getEmblemByPkmAndType()", () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        pkm: "venusaur",
        type: "bronze",
      },
    } as any as APIGatewayProxyEvent;
    const dummyData: IDBEmblem = {
      pk: "pkm:venusaur",
      sk: "type:bronze",
      color: ["green"],
      attack: -1.2,
      special_attack: 1.8,
    };
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyData,
      }),
    };

    it("should succesfully return expected result when pkm and type exist", async () => {
      (getEmblemByPkmAndType as jest.Mock).mockResolvedValue(dummyData);
      const result = await lambdaHandler(dummyProxyEvent);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return expected result when pkm and type not exist", async () => {
      (getEmblemByPkmAndType as jest.Mock).mockResolvedValue(undefined);
      const dummyInvalidDataResult = {
        ...dummyResult,
        body: JSON.stringify({
          status: "ok",
          data: {},
        }),
      };

      const result = await lambdaHandler(dummyProxyEvent);

      expect(result).toStrictEqual(dummyInvalidDataResult);
    });

    it("should return not found when pkm and type not provided", async () => {
      const dummyInvalidProxyEvent = {} as any as APIGatewayProxyEvent;
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Pkm and Type not provided",
      };

      const result = await lambdaHandler(dummyInvalidProxyEvent);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
