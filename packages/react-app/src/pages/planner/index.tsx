import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import {
  Url,
  Proxy,
  primaryFocusOptions,
  secondaryFocusOptions,
} from "../../config";
import {
  StatDataOptions,
  PokemonOptions,
  PokemonStat,
  EmblemsStat,
  StatData,
} from "./types";
import {
  processEmblemsData,
  processPokemonImages,
  processPokemonStat,
} from "./process-data";

import FilterFocus from "../../components/filter-focus";
import DisplayStat from "../../components/display-stat";
import EmblemsContainer from "../../components/emblems-container";
import PokemonsContainer from "../../components/pokemons-container";

const pokemonInitialStat: PokemonStat = {
  hp: 0,
  heal: 0,
  attack: 0,
  defense: 0,
  special_attack: 0,
  special_defense: 0,
  cooldown_rate: 0,
  critical_rate: 0,
  movement_speed: 0,
  lifesteal: 0,
  attack_speed: 0,
  tenacity: 0,
};

function Planner() {
  const { pfocus, sfocus, pokemonId } = useParams();
  const [primaryFocus, setPrimaryFocus] = useState(pfocus ? pfocus : "");
  const [secondaryFocus, setSecondaryFocus] = useState(sfocus ? sfocus : "");
  const [pokemonChoiceId, setPokemonChoiceId] = useState(
    pokemonId ? pokemonId : ""
  );
  const [pokemonChoiceName, setPokemonChoiceName] = useState("");
  const [pokemonStat, setPokemonStat] =
    useState<PokemonStat>(pokemonInitialStat);
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
  const handlePokemonChoice = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetId = event.currentTarget.getAttribute("data-key");
    const targetName = event.currentTarget.getAttribute("data-name");
    targetId && setPokemonChoiceId(targetId);
    targetName && setPokemonChoiceName(targetName);
  };

  useEffect(() => {
    fetch(Url.API + Proxy.POKEMONS)
      .then((response) => response.json())
      .then((data) => {
        setPokemonImages(processPokemonImages(data.data));
      });
  }, []);

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
          const [statResult, imageUrls] = processEmblemsData(
            data.data.slice(0, 10)
          );
          setEmblemStat(statResult);
          setEmblemImages(imageUrls);
        });
    }
  }, [primaryFocus, secondaryFocus]);

  useEffect(() => {
    if (pokemonChoiceId && primaryFocus) {
      fetch(Url.API + Proxy.POKEMONS + `?id=` + pokemonChoiceId)
        .then((response) => response.json())
        .then((data) => {
          setPokemonStat(data.data.stats[14]);
        });
    }
  }, [pokemonChoiceId, primaryFocus, secondaryFocus]);

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
            <DisplayStat
              options={formatStatOptions(emblemStat)}
              title="Current Effect"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="row middle-xs around-xs puep-div">
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <PokemonsContainer
              options={pokemonImages}
              value={pokemonChoiceId}
              onClick={handlePokemonChoice}
            />
          </div>
          <div className="col-xs-10 col-sm-6 col-md-6 col-lg-6">
            <DisplayStat
              options={formatStatOptions(
                processPokemonStat(emblemStat, pokemonStat)
              )}
              title={"Effect on Pokemon: " + pokemonChoiceName.toUpperCase()}
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

function formatStatOptions(stats: EmblemsStat | StatData): StatDataOptions[] {
  return Object.entries(stats).map(([stat, value]) => ({ stat, value }));
}

export default Planner;
