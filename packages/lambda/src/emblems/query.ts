import { DynamoDB } from "aws-sdk";
import { IDBEmblem } from "./types";
import { Utils } from "../utils";

export async function getEmblemByPkmAndType(
  pkm: string,
  type: string
): Promise<IDBEmblem | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `pkm:${pkm}`,
      sk: `type:${type}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBEmblem;
  }
}
