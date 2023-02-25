import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getEmblemById, getEmblemsByPrimaryFocus } from "./query";
import { IDBEmblem } from "./types";

export async function emblemHandler(
  emblemParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const emblemId = emblemParam?.emblem;
  const primaryFocus = emblemParam?.primaryFocus;
  if (emblemId) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemDataById(emblemId),
      }),
    };
  } else if (primaryFocus) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemsDataByPrimaryFocus(primaryFocus),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Emblem not found",
  };
}

async function getEmblemDataById(emblemId: string): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemById(emblemId);
  return emblem ? emblem : {};
}

async function getEmblemsDataByPrimaryFocus(
  primaryFocus: string
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemsByPrimaryFocus(primaryFocus);
  return emblem ? emblem : {};
}
