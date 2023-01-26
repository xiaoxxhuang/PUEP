import React, { useState } from "react";
import "./App.css";
import FilterFocus from "./components/filter-focus";
import Button from "./components/button";
import DisplayStats from "./components/display-stats";
import EmblemsContainer from "./components/emblems-container";
import PkmsContainer from "./components/pkms-container";
import { PkmStats, StatsDataOptions } from "./types";

function App() {
  const options1 = [
    { value: "hp1", label: "HP" },
    { value: "atk1", label: "Attack" },
    { value: "spatk1", label: "Sp. Atk" },
    { value: "def1", label: "Defense" },
    { value: "ms1", label: "Movement Speed" },
    { value: "cr1", label: "Crit. Hit Rate" },
    { value: "cd1", label: "Cooldown Rate" },
  ];
  const options2 = [
    { value: "hp2", label: "HP" },
    { value: "atk2", label: "Attack" },
    { value: "spatk2", label: "Sp. Atk" },
    { value: "def2", label: "Defense" },
    { value: "ms2", label: "Movement Speed" },
    { value: "cr2", label: "Crit. Hit Rate" },
    { value: "cd2", label: "Cooldown Rate" },
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
  const emblemStats = {
    Attack: "+1.5",
    "Sp. Atk": "+1.5",
    Defense: "-4",
  };
  const pkmStats: PkmStats = {
    HP: "6580",
    Attack: "288.2",
    "Sp. Atk": "962",
    "Attack Speed": "20.21%",
    Defense: "230",
    "Sp. Def": "174",
    "Cooldown Rate": "25%",
    "Crit. Hit Rate": "0%",
    Lifesteal: "0%",
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Pokemon Unite Emblems Planner</p>
      </header>
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
      <div className="puep-button-container">
        <Button children="Filter" disabled={false} />
      </div>
      <div className="puep-div">
        <EmblemsContainer options={emblemsContainer} />
        <DisplayStats
          options={formatStats(emblemStats)}
          title="Current Effect"
        />
      </div>
      <div className="puep-div">
        <PkmsContainer options={emblemsContainer} />
        <DisplayStats
          options={calculatePkmStats(emblemStats, pkmStats)}
          title="Effect on Pokemon: Venusaur"
        />
      </div>
    </div>
  );
}

function calculatePkmStats(emblemStats: Partial<PkmStats>, pkmStats: PkmStats) {
  for (const emblemStat in emblemStats) {
    const key = emblemStat as keyof PkmStats;
    pkmStats[key] = (
      Number(pkmStats[key]) + Number(emblemStats[key])
    ).toString();
  }
  return formatStats(pkmStats);
}

function formatStats(stats: object): StatsDataOptions[] {
  let displayStats: StatsDataOptions[] = [];
  Object.entries(stats).forEach((stat) => {
    displayStats.push({ stat: stat[0], value: stat[1] });
  });
  return displayStats;
}

export default App;
