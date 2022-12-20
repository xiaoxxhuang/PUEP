import React, { useState } from "react";
import "./App.css";
import Label from "./components/label";
import RadioButtonGroup from "./components/radio-button";
import Button from "./components/button";

function App() {
  const options = [
    { value: "hp1", label: "HP" },
    { value: "atk1", label: "Attack" },
    { value: "spatk1", label: "Sp. Atk" },
    { value: "def1", label: "Defense" },
    { value: "ms1", label: "Movement Speed" },
    { value: "cr1", label: "Crit. Hit Rate" },
    { value: "cd1", label: "Cooldown" },
  ];
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
        <Button children="Filter" disabled={false}/>
      </div>
      <div className="puep-radiobuttongroup-container">
        <Label children="Primary Focus:"/>
        <RadioButtonGroup
          options={options}
          value={selectedValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
