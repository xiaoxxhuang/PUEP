import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { emblemHandler } from "./emblems/handler";
import { pkmHandler } from "./pkms/handler";

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const route = event.pathParameters?.PROXY;
  const queryParam = event.queryStringParameters;

  switch (route) {
    case "emblems":
      return await emblemHandler(queryParam);
    case "pkms":
      return await pkmHandler(queryParam);
    default:
      throw new Error(`Unsupported route: ${route}`);
  }
};
