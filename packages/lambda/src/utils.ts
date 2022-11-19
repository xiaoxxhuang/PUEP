import { DynamoDB } from "aws-sdk";

function getDocumentClient() {
  return new DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
    region: process.env.REGION,
  });
}

function getTableName(): string {
  return process.env.DYNAMODB_TABLE_NAME as string;
}

function getNodeEnvironment(): string {
  return process.env.NODE_ENV as any || "prod";
}

export const Utils = {
  getDocumentClient,
  getTableName,
  getNodeEnvironment
};
