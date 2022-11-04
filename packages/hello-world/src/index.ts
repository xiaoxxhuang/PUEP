// import {
//   Context,
//   APIGatewayProxyResult,
//   APIGatewayProxyHandler,
// } from "aws-lambda";
import { NextFunction, Request, Response } from "express";
import { DynamoDB } from "aws-sdk";
import { IConfigEnvVars } from "./types";
import { Schema } from "joi";
import { Router } from "express";
import express from "express";
import Joi from "joi";
import asyncHandler from "express-async-handler";

const config: IConfigEnvVars = {
  dynamoDb: {
    tableName: "puep-dev-ddb",
  },
  environment: "dev",
};

// export const lambdaHandler: APIGatewayProxyHandler = async (
//   event,
//   context
// ): Promise<APIGatewayProxyResult> => {
//   console.log(`Event: ${JSON.stringify(event, null, 2)}`);
//   console.log(`Context: ${JSON.stringify(context, null, 2)}`);
//   // const data = getEmblemByName();
//   return {
//     statusCode: 200,
//     body: body,
//   };
// };

async function emblemHandler(
  request: Request,
  response: Response
): Promise<void> {
  const { pkm, type } = request.params;
  try {
    const emblem = await getEmblemByName(pkm, type);
    response.send(emblem).end();
  } catch (error) {
    console.log(error);
  }
}

function getDocumentClient() {
  return new DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
  });
}

const getEmblemByName = async (pkm: string, type: string) => {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: config.dynamoDb.tableName,
    Key: {
      pk: pkm,
      sk: type,
    },
  };
  try {
    return await getDocumentClient().get(params).promise();
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

export function requestValidator(schema:Schema) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (schema) {
        await schema.validateAsync(request.params);
      }
      next();
    } catch (e) {
      next(e);
    }
  };
}

const getEmblemSchema = Joi.object({
  version: Joi.string().required(),
  pkm: Joi.string().required(),
  type: Joi.string().required(),
});

const router = Router();

router.get(
  "/puep/:version/emblem?pkm=:pkm&type:type",
  requestValidator(getEmblemSchema),
  asyncHandler(emblemHandler)
);

export default express().use(router);
