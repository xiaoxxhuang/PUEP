import { lambdaHandler } from "./index";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

describe("lambdaHandler", () => {
  it("should return expected result", async () => {
    const event = {
      body: {
        client_id: "client_id",
      },
    } as any as APIGatewayEvent;
    const context = {} as Context;
    const expectedResult: APIGatewayProxyResult = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "hello world",
      }),
    };
    const result = await lambdaHandler(event, context);
    expect(result).toStrictEqual(expectedResult);
  });
});
