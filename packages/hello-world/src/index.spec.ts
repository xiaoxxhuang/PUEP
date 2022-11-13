import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaHandler } from "./index";
import { emblemHandler } from "./emblems/handler";
import { pkmHandler } from "./pkms/handler";

jest.mock("./emblems/handler");
jest.mock("./pkms/handler");

describe("lambdaHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const dummyEmblemResponse: APIGatewayProxyResult = {
    statusCode: 200,
    body: "mock emblem response",
  };
  const dummyPkmResponse: APIGatewayProxyResult = {
    statusCode: 200,
    body: "mock pkm response",
  };

  it("should succesfully return emblem result when calling emblemHandler", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
      requestContext: {
        resourceId: "GET /puep/emblems",
      },
    } as any as APIGatewayProxyEvent;
    (emblemHandler as jest.Mock).mockResolvedValue(dummyEmblemResponse);
    const result = await lambdaHandler(dummyProxyEvent);
    expect(result).toStrictEqual(dummyEmblemResponse);
  });

  it("should succesfully return pkm result when calling pkmHandler", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
      requestContext: {
        resourceId: "GET /puep/pkms",
      },
    } as any as APIGatewayProxyEvent;
    (pkmHandler as jest.Mock).mockResolvedValue(dummyPkmResponse);
    const result = await lambdaHandler(dummyProxyEvent);
    expect(result).toStrictEqual(dummyPkmResponse);
  });

  it("should succesfully return expected result when pkm and type not exist", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
      requestContext: {
        resourceId: "GET /invalid",
      },
    } as any as APIGatewayProxyEvent;

    try {
      await lambdaHandler(dummyProxyEvent);
    } catch (error) {
      expect(error).toHaveProperty(
        "message",
        "Unsupported route: GET /invalid"
      );
    }
  });

  //   it("should return not found when pkm and type not provided", async () => {
  //     const dummyInvalidProxyEvent = {} as any as APIGatewayProxyEvent;
  //     const dummtInvalidResult: APIGatewayProxyResult = {
  //       statusCode: 400,
  //       body: "Pkm and Type not provided",
  //     };

  //     const result = await lambdaHandler(dummyInvalidProxyEvent);

  //     expect(result).toStrictEqual(dummtInvalidResult);
  //   });
});
