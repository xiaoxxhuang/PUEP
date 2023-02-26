import { useEffect, useState } from "react";
import "./index.css";
import {
  Url,
  primaryFocusOptions,
  secondaryFocusOptions,
  emblemsContainer,
} from "../../config";
import { useEffectFocus } from "../../hooks/useEffectFocus";
import { StatsDataOptions, PokemonStat, EmblemsData } from "./types";

import FilterFocus from "../../components/filter-focus";
import DisplayStats from "../../components/display-stats";
import EmblemsContainer from "../../components/emblems-container";
import PokemonsContainer from "../../components/pokemons-container";

function Planner() {
  const primaryFocus = useEffectFocus();
  const secondaryFocus = useEffectFocus();
  const [emblemStat, setEmblemStat] = useState({});
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
    lifesteal: 0,
  };

  useEffect(() => {
    if (primaryFocus.value) {
      let url =
        Url.EMBLEM_API + `?primaryFocus=` + primaryFocus.value.split("1")[0];
      if (secondaryFocus.value) {
        url = url + `&secondaryFocus=` + secondaryFocus.value.split("2")[0];
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const result = processData(data.data.slice(0, 10));
          setEmblemStat(result);
        });
    }
  }, [primaryFocus.value, secondaryFocus.value]);

  return (
    <div className="puep-app">
      <div>
        <FilterFocus
          options={primaryFocusOptions}
          children="Primary Focus:"
          {...primaryFocus}
        />
        <FilterFocus
          options={secondaryFocusOptions}
          children="Secondary Focus:"
          {...secondaryFocus}
        />
      </div>
      <div>
        <div className="row middle-xs around-xs puep-div">
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <EmblemsContainer options={emblemsContainer} />
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
            <PokemonsContainer options={emblemsContainer} />
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

function processData(datas: EmblemsData[]): PokemonStat {
  const result: PokemonStat = {};
  datas.forEach((data) => {
    const prepareData: PokemonStat = prepareResponse(data);
    Object.keys(prepareData).forEach((key) => {
      const k = key as keyof PokemonStat;
      if (data[k]) {
        result[k] = (result[k] || 0) + data[k]!;
      }
    });
  });
  return result;
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
    lifesteal: data.lifesteal,
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
