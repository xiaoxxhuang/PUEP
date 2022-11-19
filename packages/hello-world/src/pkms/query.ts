import { DynamoDB } from "aws-sdk";
import { IDBPkm } from "./types";
import { Utils } from "../utils";

export async function getPkmStatsByName(
  name: string,
  type: string
): Promise<IDBPkm | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `name:${name}`,
      sk: `type:${type}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBPkm;
  }
}
