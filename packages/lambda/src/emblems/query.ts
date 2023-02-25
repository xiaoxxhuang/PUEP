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
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: Utils.getTableName(),
    FilterExpression:
      "begins_with(#pk, :prefix) AND attribute_exists(#focus) AND #focus >= :focus AND #type = :type",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#focus": `${primaryFocus}`,
      "#type": "type",
    },
    ExpressionAttributeValues: {
      ":prefix": "emblem:",
      ":focus": 0,
      ":type": "gold",
    },
  };

  const results = await Utils.getDocumentClient().scan(params).promise();
  if (results?.Items && results.Items.length > 0) {
    return results.Items as IDBEmblem[];
  }
}
