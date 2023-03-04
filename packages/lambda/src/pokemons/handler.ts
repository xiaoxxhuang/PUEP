import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getPokemonById, getPokemonNamesAndUrls } from "./query";
import { IDBPokemon, IDBPokemonNamesAndUrls } from "./types";

export async function pokemonHandler(
  pokemonParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const pokemonId = pokemonParam?.id;
  const limit = pokemonParam?.limit;
  if (pokemonId) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPokemonDataById(pokemonId),
      }),
    };
  } else if (limit) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPokemonsData(limit),
      }),
    };
  }
  return {
    statusCode: 400,
    body: "Pokemon not found",
  };
}

async function getPokemonDataById(id: string): Promise<IDBPokemon | {}> {
  const emblem = await getPokemonById(id);
  return emblem ? emblem : {};
}

async function getPokemonsData(limit: string): Promise<IDBPokemonNamesAndUrls | {}> {
  const emblem = await getPokemonNamesAndUrls(limit);
  return emblem ? emblem : {};
}
