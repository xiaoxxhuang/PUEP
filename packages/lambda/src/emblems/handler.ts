import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import {
  getEmblemById,
  getEmblemsByPrimaryFocus,
  getEmblemsByFocuses,
} from "./query";
import { IDBEmblem } from "./types";

export async function emblemHandler(
  emblemParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const emblemId = emblemParam?.id;
  const primaryFocus = emblemParam?.primaryFocus;
  const secondaryFocus = emblemParam?.secondaryFocus;
  if (emblemId) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemDataById(emblemId),
      }),
    };
  } else if (primaryFocus && secondaryFocus) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getEmblemsDataByFocuses(primaryFocus, secondaryFocus),
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

async function getEmblemsDataByFocuses(
  primaryFocus: string,
  secondaryFocus: string
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemsByFocuses(primaryFocus, secondaryFocus);
  return emblem ? emblem : {};
}

async function getEmblemsDataByPrimaryFocus(
  primaryFocus: string
): Promise<IDBEmblem | {}> {
  const emblem = await getEmblemsByPrimaryFocus(primaryFocus);
  return emblem ? emblem : {};
}
