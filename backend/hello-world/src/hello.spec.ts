import { lambdaHandler } from "./hello";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

describe("lambdaHandler", async () => {
  const event = {
    body: {
      client_id: "client_id",
    },
  } as any as APIGatewayEvent;
  const context = {} as Context;
  const expectedResult: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello world",
    }),
  }
  const result = await lambdaHandler(event, context);
  expect(result).toStrictEqual(expectedResult);
});
