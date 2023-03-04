import { DynamoDB } from "aws-sdk";
import { IDBPokemon, IDBPokemonNamesAndUrls } from "./types";
import { Utils } from "../utils";

export async function getPokemonById(
  pokemonId: string
): Promise<IDBPokemon | undefined> {
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: Utils.getTableName(),
    Key: {
      pk: `pokemon:${pokemonId}`,
    },
  };

  const result = await Utils.getDocumentClient().get(params).promise();

  if (result?.Item) {
    return result.Item as IDBPokemon;
  }
}

export async function getPokemonNamesAndUrls(
  limit: string
): Promise<IDBPokemonNamesAndUrls[] | undefined> {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: Utils.getTableName(),
    FilterExpression: "begins_with(#pk, :prefix) ",
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":prefix": "pokemon:",
    },
    ProjectionExpression: "name, url",
    Limit: parseInt(limit),
  };

  const results = await Utils.getDocumentClient().scan(params).promise();

  if (results?.Items && results.Items.length > 0) {
    return results.Items as IDBPokemonNamesAndUrls[];
  }
}
