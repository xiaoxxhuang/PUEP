import React from "react";
import "./index.css";

export interface PokemonOptions {
  order: number;
}
export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: PokemonOptions[];
}

function PokemonsContainer(props: Props) {
  const { options } = props;

  const pokemons = options.map((option) => (
    <div key={`pokemon_${option.order}`} className="puep-pokemon"></div>
  ));

  return (
    <div className="puep-pokemons-container">
      {pokemons}
    </div>
  );
}

export default PokemonsContainer;
