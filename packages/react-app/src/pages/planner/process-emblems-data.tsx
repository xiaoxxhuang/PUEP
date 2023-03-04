import "./index.css";
import { Url, Proxy } from "../../config";
import { EmblemsStat, EmblemsData } from "./types";

export function processEmblemsData(
  datas: EmblemsData[]
): [EmblemsStat, string[]] {
  const statResult: EmblemsStat = {};
  const emblemImages: string[] = [];
  datas.forEach((data) => {
    emblemImages.push(processImageUrl(data["url"]));
    sumEmblemStat(prepareResponse(data), statResult);
  });

  return [statResult, emblemImages];
}

function processImageUrl(url: string): string {
  return Url.IMAGES_BUCKET + Proxy.EMBLEMS + url;
}

function prepareResponse(data: EmblemsData): EmblemsStat {
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

function sumEmblemStat(data: EmblemsStat, result: EmblemsStat) {
  Object.keys(data).forEach((key) => {
    const k = key as keyof EmblemsStat;
    if (data[k]) {
      result[k] = parseFloat(((result[k] || 0) + (data[k] || 0)).toFixed(1));
    }
  });
}
