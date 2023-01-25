import React, { memo, useState } from "react";
import "./App.css";
import Label from "./components/label";
import RadioButtonGroup from "./components/radio-button";
import Button from "./components/button";
import Stats from "./components/stats";
import Title from "./components/title";

function App() {
  const options1 = [
    { value: "hp1", label: "HP" },
    { value: "atk1", label: "Attack" },
    { value: "spatk1", label: "Sp. Atk" },
    { value: "def1", label: "Defense" },
    { value: "ms1", label: "Movement Speed" },
    { value: "cr1", label: "Crit. Hit Rate" },
    { value: "cd1", label: "Cooldown" },
  ];
  const options2 = [
    { value: "hp2", label: "HP" },
    { value: "atk2", label: "Attack" },
    { value: "spatk2", label: "Sp. Atk" },
    { value: "def2", label: "Defense" },
    { value: "ms2", label: "Movement Speed" },
    { value: "cr2", label: "Crit. Hit Rate" },
    { value: "cd2", label: "Cooldown" },
  ];
  const displayEmblemStats = [
    { stat: "Attack", value: "+1.5" },
    { stat: "Sp. Atk", value: "+1.5" },
    { stat: "Defense", value: "-4" },
  ]
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Example of static website using react</p>
        <p>Learn React</p>
      </header>
      <div className="puep-button-container">
        <Button children="Filter" disabled={false} />
      </div>
      <div className="puep-radiobuttongroup-container">
        <Label children="Primary Focus:" />
        <RadioButtonGroup
          options={options1}
          value={selectedValue}
          onChange={handleChange}
        />
      </div>
      <div className="puep-radiobuttongroup-container">
        <Label children="Secondary Focus:" />
        <RadioButtonGroup
          options={options2}
          value={selectedValue}
          onChange={handleChange}
        />
      </div>
      <div>
        <Title children="Current Effect"/>
        <Stats options={displayEmblemStats}/>
      </div>
    </div>
  );
}

export default memo(App);
