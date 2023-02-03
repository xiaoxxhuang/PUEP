import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { lambdaHandler } from "./index";
import { emblemHandler } from "./emblems/handler";
import { pokemonHandler } from "./pokemons/handler";

jest.mock("./emblems/handler");
jest.mock("./pokemons/handler");

describe("lambdaHandler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const dummyEmblemResponse: APIGatewayProxyResult = {
    statusCode: 200,
    body: "mock emblem response",
  };
  const dummyPokemonResponse: APIGatewayProxyResult = {
    statusCode: 200,
    body: "mock pokemon response",
  };

  it("should succesfully return emblem result when calling emblemHandler", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
      pathParameters: {
        PROXY: "emblems",
      },
    } as any as APIGatewayProxyEvent;
    (emblemHandler as jest.Mock).mockResolvedValue(dummyEmblemResponse);
    const result = await lambdaHandler(dummyProxyEvent);
    expect(result).toStrictEqual(dummyEmblemResponse);
  });

  it("should succesfully return pokemon result when calling pokemonHandler", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
      pathParameters: {
        PROXY: "pokemons",
      },
    } as any as APIGatewayProxyEvent;
    (pokemonHandler as jest.Mock).mockResolvedValue(dummyPokemonResponse);
    const result = await lambdaHandler(dummyProxyEvent);
    expect(result).toStrictEqual(dummyPokemonResponse);
  });

  it("should succesfully throw error when proxy not exist", async () => {
    const dummyProxyEvent = {
      queryStringParameters: {
        param: "dummy_param",
      },
    } as any as APIGatewayProxyEvent;

    try {
      await lambdaHandler(dummyProxyEvent);
    } catch (error) {
      expect(error).toHaveProperty(
        "message",
        "Unsupported route"
      );
    }
  });
});
