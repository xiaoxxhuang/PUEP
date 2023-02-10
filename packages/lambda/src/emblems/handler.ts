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
        data: await getEmblemData(emblemId),
      }),
    };
  } else if (primaryFocus) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemDataByFocus(primaryFocus),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Emblem not found",
  };
}

async function getEmblemData(
  emblemId: string,
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemById(emblemId);
  return emblem ? emblem : {};
}

async function getEmblemDataByFocus(
  primaryFocus: string,
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemsByPrimaryFocus(primaryFocus);
  return emblem ? emblem : {};
}
