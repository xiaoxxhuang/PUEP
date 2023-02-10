import { DynamoDB } from "aws-sdk";
import { IDBPokemon } from "./types";
import { Utils } from "../utils";

export async function getPokemonStatsByName(
  name: string,
  type: string
): Promise<IDBPokemon | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `name:${name}`,
      sk: `type:${type}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBPokemon;
  }
}
