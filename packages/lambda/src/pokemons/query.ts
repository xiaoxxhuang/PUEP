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

export async function getPokemonNamesAndUrls(): Promise<
  IDBPokemonNamesAndUrls[] | undefined
> {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: Utils.getTableName(),
    FilterExpression: "begins_with(#pk, :prefix) ",
    ProjectionExpression: "#name, #url",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#name": "name",
      "#url": "url",
    },
    ExpressionAttributeValues: {
      ":prefix": "pokemon:",
    },
  };

  const results = await Utils.getDocumentClient().scan(params).promise();

  if (results?.Items && results.Items.length > 0) {
    return results.Items as IDBPokemonNamesAndUrls[];
  }
}
