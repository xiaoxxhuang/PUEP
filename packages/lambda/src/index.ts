import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { emblemHandler } from "./emblems/handler";
import { pokemonHandler } from "./pokemons/handler";

const routes: Record<string, Function> = {
  emblems: emblemHandler,
  pokemons: pokemonHandler,
  error: () => new Error(`Unsupported route`),
};

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const route = event.pathParameters?.PROXY || "error";
  const queryParam = event.queryStringParameters;

  return await routes[route](queryParam);
};
