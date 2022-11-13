import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getPkmStatsByName } from "./query";
import { IDBPkm } from "./types";

export async function pkmHandler(
  pkmParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const name = pkmParam?.name;
  const type = pkmParam?.type;
  if (name && type) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPkmData(name, type),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Name and Type not provided",
  };
}

async function getPkmData(name: string, type: string): Promise<IDBPkm | {}> {
  const emblem = await getPkmStatsByName(name, type);
  return emblem ? emblem : {};
}
