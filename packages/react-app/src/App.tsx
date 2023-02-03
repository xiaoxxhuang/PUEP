import React, { useState } from "react";
import "./App.css";
import PuepHeader from "./components/puep-header";
import FilterFocus from "./components/filter-focus";
import DisplayStats from "./components/display-stats";
import EmblemsContainer from "./components/emblems-container";
import PokemonsContainer from "./components/pokemons-container";
import { StatsDataOptions, PokemonStat } from "./types";

function App() {
  const options1 = [
    { value: "hp1", label: "HP" },
    { value: "attack1", label: "Attack" },
    { value: "special_attack1", label: "Special Attack" },
    { value: "defense1", label: "Defense" },
    { value: "special_defense1", label: "Special Defense" },
    { value: "movement_speed1", label: "Movement Speed" },
    { value: "critical_rate1", label: "Critical Hit Rate" },
    { value: "cooldown_rate1", label: "Cooldown Rate" },
  ];
  const options2 = [
    { value: "hp2", label: "HP" },
    { value: "attack2", label: "Attack" },
    { value: "special_attack2", label: "Special Attack" },
    { value: "defense2", label: "Defense" },
    { value: "special_defense2", label: "Special Defense" },
    { value: "movement_speed2", label: "Movement Speed" },
    { value: "critical_rate2", label: "Critical Hit Rate" },
    { value: "cooldown_rate2", label: "Cooldown Rate" },
  ];
  const emblemsContainer = [
    { order: 0, rotateDegree: 0 },
    { order: 1, rotateDegree: 36 },
    { order: 2, rotateDegree: 72 },
    { order: 3, rotateDegree: 108 },
    { order: 4, rotateDegree: 144 },
    { order: 5, rotateDegree: 180 },
    { order: 6, rotateDegree: 216 },
    { order: 7, rotateDegree: 252 },
    { order: 8, rotateDegree: 288 },
    { order: 9, rotateDegree: 324 },
  ];
  const emblemStat: PokemonStat = {
    attack: "+1.5",
    special_attack: "+1.5",
    defense: "-4",
  };
  const pokemonStat: PokemonStat = {
    hp: "6580",
    attack: "288.2",
    special_attack: "962",
    attack_speed: "20.21%",
    defense: "230",
    special_defense: "174",
    cooldown_rate: "25%",
    critical_rate: "0%",
    lifesteal: "0%",
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="puep-app">
      <PuepHeader />
      <div>
        <FilterFocus
          options={options1}
          value={selectedValue}
          children="Primary Focus:"
          onChange={handleChange}
        />
        <FilterFocus
          options={options2}
          value={selectedValue}
          children="Secondary Focus:"
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="puep-div center-xs row middle-xs around-xs">
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
        <div className="puep-div center-xs row middle-xs around-xs">
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

function calculatePokemonStat(
  emblemStat: PokemonStat,
  pokemonStat: PokemonStat
) {
  for (const stat in emblemStat) {
    const key = stat as keyof PokemonStat;
    pokemonStat[key] = (
      Number(pokemonStat[key]) + Number(emblemStat[key])
    ).toString();
  }
  return formatStatOptions(pokemonStat);
}

function formatStatOptions(stats: object): StatsDataOptions[] {
  const displayStat: StatsDataOptions[] = [];
  Object.entries(stats).forEach((stat) => {
    displayStat.push({ stat: stat[0], value: stat[1] });
  });
  return displayStat;
}

export default App;
