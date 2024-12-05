import "./index.css";
import { Url, Proxy } from "../../config";
import {
  EmblemsStat,
  EmblemsData,
  PokemonOptions,
  PokemonStat,
  StatData,
  StatDataOptions,
} from "./types";

export function processPokemonImages(
  datas: PokemonOptions[]
): PokemonOptions[] {
  return datas.map((option: PokemonOptions) => ({
    pk: option.pk.split(":")[1],
    name: option.name,
    url: Url.IMAGES_BUCKET + Proxy.POKEMONS + option.url,
  }));
}

export function processEmblemsData(
  datas: EmblemsData[]
): [EmblemsStat, string[]] {
  const statResult: EmblemsStat = {};
  const emblemImages: string[] = [];
  datas.forEach((data) => {
    emblemImages.push(processImageUrl(data["url"]));
    sumStat(prepareEmblemsData(data), statResult);
  });

  return [statResult, emblemImages];
}

export function processPokemonStat(
  emblemStat: EmblemsStat,
  pokemonStat: PokemonStat
): [StatData, StatData] {
  const preparePokemonStat = preparePokemonData(pokemonStat);
  sumStat(emblemStat, preparePokemonStat);
  return [
    preparePokemonResponse(preparePokemonStat),
    preparePokemonResponse(preparePokemonData(pokemonStat))
  ];
}

export function formatEmblemStatOptions(stat: EmblemsStat): StatDataOptions[] {
  return Object.entries(stat).map(([stat, value]) => ({ stat, value }));
}

export function formatPokemonStatOptions(stats: StatData[]) {
  const result = Object.entries(stats[0]).map(([stat, value]) => {
    const key = stat as keyof StatData;
    return {
      stat: stat,
      value: value,
      original_value: stats[1][key],
    };
  });
  return result;
}

function sumStat(data: EmblemsStat, result: EmblemsStat) {
  Object.keys(data).forEach((key) => {
    const k = key as keyof EmblemsStat;
    if (data[k]) {
      result[k] = parseFloat(((result[k] || 0) + (data[k] || 0)).toFixed(1));
    }
  });
}

function processImageUrl(url: string): string {
  return Url.IMAGES_BUCKET + Proxy.EMBLEMS + url;
}

function prepareEmblemsData(data: EmblemsData): EmblemsStat {
  return {
    hp: data.hp,
    attack: data.attack,
    special_attack: data.special_attack,
    attack_speed: data.attack_speed,
    defense: data.defense,
    special_defense: data.special_defense,
    cooldown_rate: data.cooldown_rate,
    critical_rate: data.critical_rate,
    movement_speed: data.movement_speed,
  };
}

function preparePokemonData(data: PokemonStat): PokemonStat {
  return {
    hp: data.hp,
    attack: data.attack,
    special_attack: data.special_attack,
    defense: data.defense,
    special_defense: data.special_defense,
    cooldown_rate: data.cooldown_rate * 100,
    critical_rate: data.critical_rate * 100,
    attack_speed: data.attack_speed * 100,
    lifesteal: data.lifesteal * 100,
    tenacity: data.tenacity * 100,
    heal: data.heal,
    movement_speed: data.movement_speed,
  };
}

function preparePokemonResponse(data: PokemonStat): StatData {
  return {
    hp: data.hp.toString(),
    attack: data.attack.toString(),
    special_attack: data.special_attack.toString(),
    defense: data.defense.toString(),
    special_defense: data.special_defense.toString(),
    cooldown_rate: data.cooldown_rate.toFixed(2) + "%",
    critical_rate: data.critical_rate.toFixed(2) + "%",
    attack_speed: data.attack_speed.toFixed(2) + "%",
    lifesteal: data.lifesteal.toFixed(2) + "%",
    tenacity: data.tenacity.toFixed(2) + "%",
    heal: data.heal.toString() + " /s",
    movement_speed: data.movement_speed.toString() + " cm/s",
  };
}
