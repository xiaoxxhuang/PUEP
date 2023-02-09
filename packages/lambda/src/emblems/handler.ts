import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getEmblemById } from "./query";
import { IDBEmblem } from "./types";

export async function emblemHandler(
  emblemParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const pokemon = emblemParam?.pokemon;
  if (pokemon) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemData(pokemon),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Emblem id not provided",
  };
}

async function getEmblemData(
  pokemon: string,
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemById(pokemon);
  return emblem ? emblem : {};
}
