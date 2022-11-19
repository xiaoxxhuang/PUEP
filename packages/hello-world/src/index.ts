import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { emblemHandler } from "./emblems/handler";
import { pkmHandler } from "./pkms/handler";

const routes: Record<string, Function> = {
  emblems: emblemHandler,
  pkms: pkmHandler,
  error: () => new Error(`Unsupported route`),
};

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const route = event.pathParameters?.PROXY || "error";
  const queryParam = event.queryStringParameters;

  return await routes[route](queryParam);
};
