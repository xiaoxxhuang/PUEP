import {
  APIGatewayProxyResult,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { emblemHandler } from "./handler";
import {
  getEmblemById,
  getEmblemsByPrimaryFocus,
  getEmblemsByFocuses,
} from "./query";
import { IDBEmblem } from "./types";

jest.mock("./query");

describe("emblemHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("getEmblemById()", () => {
    const dummyEmblemId = "001A";
    const dummyEmblemParam: APIGatewayProxyEventQueryStringParameters = {
      id: dummyEmblemId,
    };
    const dummyEmblem: IDBEmblem = {
      pk: `emblem:${dummyEmblemId}`,
      color: "green",
      attack: -1.2,
      special_attack: 1.8,
      url: "https://example.com",
    };
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyEmblem,
      }),
    };

    it("should succesfully return expected result when emblemId exist", async () => {
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
        body: "Emblem not found",
      };

      const result = await emblemHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });

  describe("getEmblemsByPrimaryFocus()", () => {
    const dummyPrimaryFocus = "hp";
    const dummyEmblemParam: APIGatewayProxyEventQueryStringParameters = {
      primaryFocus: dummyPrimaryFocus,
    };
    const dummyEmblems: IDBEmblem[] = [
      {
        pk: `emblem:`,
        color: "green",
        hp: 30,
        attack: -1.2,
        url: "https//example.com",
      },
    ];
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyEmblems,
      }),
    };

    it("should succesfully return expected result when emblems exist", async () => {
      (getEmblemsByPrimaryFocus as jest.Mock).mockResolvedValue(dummyEmblems);
      const result = await emblemHandler(dummyEmblemParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return empty list when no emblem match the primary focus", async () => {
      (getEmblemsByPrimaryFocus as jest.Mock).mockResolvedValue(undefined);
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

    it("should return not found when no parameter provided", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Emblem not found",
      };

      const result = await emblemHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });

  describe("getEmblemsByFocuses()", () => {
    const dummyPrimaryFocus = "hp";
    const dummySecondaryFocus = "attack";
    const dummyEmblemParam: APIGatewayProxyEventQueryStringParameters = {
      primaryFocus: dummyPrimaryFocus,
      secondaryFocus: dummySecondaryFocus,
    };
    const dummyEmblems: IDBEmblem[] = [
      {
        pk: `emblem:`,
        color: "green",
        hp: 30,
        defense: -3,
        url: "https//example.com",
      },
    ];
    const dummyResult: APIGatewayProxyResult = {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: dummyEmblems,
      }),
    };

    it("should succesfully return expected result", async () => {
      (getEmblemsByFocuses as jest.Mock).mockResolvedValue(dummyEmblems);
      const result = await emblemHandler(dummyEmblemParam);
      expect(result).toStrictEqual(dummyResult);
    });

    it("should succesfully return empty list when no emblem match the focus", async () => {
      (getEmblemsByFocuses as jest.Mock).mockResolvedValue(undefined);
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

    it("should return not found when no parameter provided", async () => {
      const dummtInvalidResult: APIGatewayProxyResult = {
        statusCode: 400,
        body: "Emblem not found",
      };

      const result = await emblemHandler(null);

      expect(result).toStrictEqual(dummtInvalidResult);
    });
  });
});
