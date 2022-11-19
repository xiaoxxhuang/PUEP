import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getEmblemByPkmAndType } from "./query";
import { IDBEmblem } from "./types";

export async function emblemHandler(
  emblemParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const pkm = emblemParam?.pkm;
  const type = emblemParam?.type;
  if (pkm && type) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemData(pkm, type),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Pkm and Type not provided",
  };
}

async function getEmblemData(
  pkm: string,
  type: string
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemByPkmAndType(pkm, type);
  return emblem ? emblem : {};
}
