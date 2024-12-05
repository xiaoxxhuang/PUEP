import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./index.css";
import { Url, Proxy, focusOptions } from "../../config";
import {
  pokemonInitialStat,
  PokemonOptions,
  PokemonStat,
  EmblemsStat,
} from "./types";
import {
  processEmblemsData,
  processPokemonImages,
  processPokemonStat,
  formatEmblemStatOptions,
  formatPokemonStatOptions,
} from "./process-data";

import FilterFocus from "../../components/filter-focus";
import DisplayStat from "../../components/display-stat";
import EmblemsContainer from "../../components/emblems-container";
import PokemonsContainer from "../../components/pokemons-container";
import { capitalize } from "../../utils";

function Planner() {
  const [urlParam, setUrlParam] = useSearchParams();
  const [pokemonChoiceName, setPokemonChoiceName] = useState("");
  const [emblemStat, setEmblemStat] = useState<EmblemsStat>({});
  const [emblemImages, setEmblemImages] = useState<string[]>([]);
  const [initialPokemonStat, setInitialPokemonStat] =
    useState<PokemonStat>(pokemonInitialStat);
  const [pokemonImages, setPokemonImages] = useState<PokemonOptions[]>([]);

  const primaryFocus = urlParam.get("primary") || "";
  const secondaryFocus = urlParam.get("secondary") || "";
  const pokemonChoiceId = urlParam.get("pokemon") || "";

  console.log("checking render counts");

  const handlePrimaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (secondaryFocus !== "") {
      setUrlParam({ primary: event.target.value, secondary: secondaryFocus });
    } else {
      setUrlParam({ primary: event.target.value });
    }
  };
  const handleSecondaryFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (primaryFocus !== "") {
      setUrlParam({ primary: primaryFocus, secondary: event.target.value });
    }
  };
  const handlePokemonChoice = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetId = event.currentTarget.getAttribute("data-key");
    const targetName = event.currentTarget.getAttribute("data-name");
    if (primaryFocus !== "" && targetId) {
      targetName && setPokemonChoiceName(targetName);
      setUrlParam({
        primary: primaryFocus,
        secondary: secondaryFocus,
        pokemon: targetId,
      });
    }
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
      let url = Url.API + Proxy.EMBLEMS + `?primaryFocus=` + primaryFocus;
      if (secondaryFocus) {
        url = url + `&secondaryFocus=` + secondaryFocus;
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
          setInitialPokemonStat(data.data.stats[14]);
        });
    }
  }, [pokemonChoiceId, primaryFocus, secondaryFocus]);

  return (
    <div className="puep-app">
      <div>
        <FilterFocus
          title="Primary Focus:"
          options={focusOptions}
          value={primaryFocus}
          disabledFocus={secondaryFocus}
          onChange={handlePrimaryFocus}
        />
        <FilterFocus
          title="Secondary Focus:"
          options={focusOptions}
          value={secondaryFocus}
          disabledFocus={primaryFocus}
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
              options={formatEmblemStatOptions(emblemStat)}
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
              options={formatPokemonStatOptions(
                processPokemonStat(emblemStat, initialPokemonStat)
              )}
              title={"Effect on Pokemon: " + capitalize(pokemonChoiceName)}
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

export default Planner;
