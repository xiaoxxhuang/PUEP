import { DynamoDB } from "aws-sdk";
import { IConfigEnvVars } from "./types";

const config: IConfigEnvVars = {
  dynamoDb: {
    tableName: process.env.dynamodb_name || "",
  },
  environment: process.env.environment as any || "prod",
};

function getDocumentClient() {
  return new DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
    region: "ap-southeast-1",
  });
}

function getTableName(): string {
  return config.dynamoDb.tableName;
}

export const Utils = {
  getDocumentClient,
  getTableName,
};
