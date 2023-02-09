import { DynamoDB } from "aws-sdk";
import { IDBEmblem } from "./types";
import { Utils } from "../utils";

export async function getEmblemById(
  pokemon: string,
): Promise<IDBEmblem | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `emblem:${pokemon}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBEmblem;
  }
}
