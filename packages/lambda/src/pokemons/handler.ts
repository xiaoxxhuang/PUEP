import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getPokemonStatsByName } from "./query";
import { IDBPokemon } from "./types";

export async function pokemonHandler(
  pokemonParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const name = pokemonParam?.name;
  const type = pokemonParam?.type;
  if (name && type) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPokemonData(name, type),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Name and Type not provided",
  };
}

async function getPokemonData(name: string, type: string): Promise<IDBPokemon | {}> {
  const emblem = await getPokemonStatsByName(name, type);
  return emblem ? emblem : {};
}
