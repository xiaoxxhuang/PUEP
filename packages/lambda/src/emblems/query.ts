import { DynamoDB } from "aws-sdk";
import { IDBEmblem } from "./types";
import { Utils } from "../utils";

export async function getEmblemById(
  emblemId: string
): Promise<IDBEmblem | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `emblem:${emblemId}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBEmblem;
  }
}

export async function getEmblemsByPrimaryFocus(
  primaryFocus: string
): Promise<IDBEmblem[] | undefined> {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: Utils.getTableName(),
    KeyConditionExpression: `begins_with(#pk, :prefix)`,
    FilterExpression: "attribute_exists(#focus)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#focus": `${primaryFocus}`,
    },
    ExpressionAttributeValues: {
      ":prefix": "emblem:",
    },
    ScanIndexForward: false,
    Limit: 10
  };

  const results = await Utils.getDocumentClient().query(params).promise();
  if (results?.Items && results.Items.length > 0) {
    return results.Items as IDBEmblem[];
  } else {
    return [];
  }
}
