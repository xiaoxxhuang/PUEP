import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getEmblemByPokemonAndType } from "./query";
import { IDBEmblem } from "./types";

export async function emblemHandler(
  emblemParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const pokemon = emblemParam?.pokemon;
  const type = emblemParam?.type;
  if (pokemon && type) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemData(pokemon, type),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Pokemon and Type not provided",
  };
}

async function getEmblemData(
  pokemon: string,
  type: string
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemByPokemonAndType(pokemon, type);
  return emblem ? emblem : {};
}
