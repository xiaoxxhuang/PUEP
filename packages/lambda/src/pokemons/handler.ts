import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda";
import { getPokemonById, getPokemonNamesAndUrls } from "./query";
import { IDBPokemon, IDBPokemonNamesAndUrls } from "./types";

export async function pokemonHandler(
  pokemonParam: APIGatewayProxyEventQueryStringParameters | null
) {
  const pokemonId = pokemonParam?.id;
  if (pokemonId) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPokemonDataById(pokemonId),
      }),
    };
  } else if (pokemonParam == null) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        data: await getPokemonsData(),
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

async function getPokemonsData(): Promise<IDBPokemonNamesAndUrls | {}> {
  const emblem = await getPokemonNamesAndUrls();
  return emblem ? emblem : {};
}
