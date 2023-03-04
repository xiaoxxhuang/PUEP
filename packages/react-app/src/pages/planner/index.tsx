import { useEffect, useState } from "react";
import "./index.css";
import {
  Url,
  Proxy,
  primaryFocusOptions,
  secondaryFocusOptions,
} from "../../config";
import { StatsDataOptions, EmblemsStat, PokemonOptions } from "./types";
import { processEmblemsData } from "./process-emblems-data";

import FilterFocus from "../../components/filter-focus";
import DisplayStats from "../../components/display-stats";
import EmblemsContainer from "../../components/emblems-container";
import PokemonsContainer from "../../components/pokemons-container";

function Planner() {
  const [primaryFocus, setPrimaryFocus] = useState("");
  const [secondaryFocus, setSecondaryFocus] = useState("");
  const [emblemStat, setEmblemStat] = useState<EmblemsStat>({});
  const [emblemImages, setEmblemImages] = useState<string[]>([]);
  const [pokemonImages, setPokemonImages] = useState<PokemonOptions[]>([]);

  console.log("checking render counts");

  const handlePrimaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryFocus(event.target.value);
  };
  const handleSecondaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryFocus(event.target.value);
  };

  useEffect(() => {
    if (primaryFocus) {
      let url =
        Url.API + Proxy.EMBLEMS + `?primaryFocus=` + primaryFocus.split("1")[0];
      if (secondaryFocus) {
        url = url + `&secondaryFocus=` + secondaryFocus.split("2")[0];
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const [statResult, imageUrls] = processEmblemsData(data.data.slice(0, 10));
          setEmblemStat(statResult);
          setEmblemImages(imageUrls);
        });
    }
  }, [primaryFocus, secondaryFocus]);

  useEffect(() => {
    fetch(Url.API + Proxy.POKEMONS)
      .then((response) => response.json())
      .then((data) => {
        setPokemonImages(processPokemonImages(data.data));
      });
  }, []);

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
            <EmblemsContainer imageUrls={emblemImages} />
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
            <PokemonsContainer options={pokemonImages} />
          </div>
          {/* <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <DisplayStats
              options={calculatePokemonStat(emblemStat, pokemonStat)}
              title="Effect on Pokemon: Venusaur"
            />
          </div> */}
        </div>
      </div>
      <div className="puep-app-footer">
        <p></p>
      </div>
    </div>
  );
}

function processPokemonImages(datas: PokemonOptions[]): PokemonOptions[] {
  return datas.map((option: PokemonOptions) => ({
    name: option.name,
    url: Url.IMAGES_BUCKET + Proxy.POKEMONS + option.url,
  }));
}

// function calculatePokemonStat(
//   emblemStat: PokemonStat,
//   pokemonStat: PokemonStat
// ) {
//   for (const stat in emblemStat) {
//     const key = stat as keyof PokemonStat;
//     if (pokemonStat[key] && emblemStat[key]) {
//       pokemonStat[key]! += emblemStat[key]!;
//     }
//   }
//   return formatStatOptions(pokemonStat);
// }

function formatStatOptions(stats: EmblemsStat): StatsDataOptions[] {
  return Object.entries(stats).map(([stat, value]) => ({ stat, value }));
}

export default Planner;
