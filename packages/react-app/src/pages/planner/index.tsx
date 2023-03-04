import { useEffect, useState } from "react";
import "./index.css";
import {
  Url,
  primaryFocusOptions,
  secondaryFocusOptions,
  emblemsContainerOptions,
} from "../../config";
import { StatsDataOptions, PokemonStat, EmblemsData } from "./types";

import FilterFocus from "../../components/filter-focus";
import DisplayStats from "../../components/display-stats";
import EmblemsContainer from "../../components/emblems-container";
import PokemonsContainer from "../../components/pokemons-container";

function Planner() {
  const [primaryFocus, setPrimaryFocus] = useState("");
  const [secondaryFocus, setSecondaryFocus] = useState("");
  const [emblemStat, setEmblemStat] = useState<PokemonStat>({});
  const [emblemImageUrls, setEmblemImageUrls] = useState<string[]>([]);
  console.log("checking render counts");

  const pokemonStat: PokemonStat = {
    hp: 6580,
    attack: 288.2,
    special_attack: 962,
    attack_speed: 0.2021,
    defense: 230,
    special_defense: 174,
    cooldown_rate: 0.25,
    critical_rate: 0,
  };
  const handlePrimaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryFocus(event.target.value);
  };
  const handleSecondaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryFocus(event.target.value);
  };

  useEffect(() => {
    if (primaryFocus) {
      let url = Url.EMBLEM_API + `?primaryFocus=` + primaryFocus.split("1")[0];
      if (secondaryFocus) {
        url = url + `&secondaryFocus=` + secondaryFocus.split("2")[0];
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const [statResult, imageUrls] = processData(data.data.slice(0, 10));
          setEmblemStat(statResult);
          setEmblemImageUrls(imageUrls);
        });
    }
  }, [primaryFocus, secondaryFocus]);

  return (
    <div className="puep-app">
      <div>
        <FilterFocus
          options={primaryFocusOptions}
          children="Primary Focus:"
          value={primaryFocus}
          onChange={handlePrimaryFocus}
        />
        <FilterFocus
          options={secondaryFocusOptions}
          children="Secondary Focus:"
          value={secondaryFocus}
          onChange={handleSecondaryFocus}
        />
      </div>
      <div>
        <div className="row middle-xs around-xs puep-div">
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <EmblemsContainer imageUrls={emblemImageUrls} />
          </div>
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <DisplayStats
              options={formatStatOptions(emblemStat)}
              title="Current Effect"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="row middle-xs around-xs puep-div">
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <PokemonsContainer options={emblemsContainerOptions} />
          </div>
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <DisplayStats
              options={calculatePokemonStat(emblemStat, pokemonStat)}
              title="Effect on Pokemon: Venusaur"
            />
          </div>
        </div>
      </div>
      <div className="puep-app-footer">
        <p></p>
      </div>
    </div>
  );
}

function processData(datas: EmblemsData[]): [PokemonStat, string[]] {
  const statResult: PokemonStat = {};
  const imageUrls: string[] = [];
  datas.forEach((data) => {
    imageUrls.push(data["url"]);
    const prepareData: PokemonStat = prepareResponse(data);
    Object.keys(prepareData).forEach((key) => {
      const k = key as keyof PokemonStat;
      if (data[k]) {
        statResult[k] = parseFloat(
          ((statResult[k] || 0) + (data[k] || 0)).toFixed(1)
        );
      }
    });
  });

  const emblemImageUrls = processImageUrls(imageUrls);
  return [statResult, emblemImageUrls];
}

function processImageUrls(urls: string[]): string[] {
  const imageUrls = urls.map((url) => Url.IMAGES_BUCKET + url);
  return imageUrls;
}

function prepareResponse(data: EmblemsData): PokemonStat {
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

function calculatePokemonStat(
  emblemStat: PokemonStat,
  pokemonStat: PokemonStat
) {
  for (const stat in emblemStat) {
    const key = stat as keyof PokemonStat;
    if (pokemonStat[key] && emblemStat[key]) {
      pokemonStat[key]! += emblemStat[key]!;
    }
  }
  return formatStatOptions(pokemonStat);
}

function formatStatOptions(stats: PokemonStat): StatsDataOptions[] {
  return Object.entries(stats).map(([stat, value]) => ({ stat, value }));
}

export default Planner;
