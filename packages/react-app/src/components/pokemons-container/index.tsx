import React from "react";
import "./index.scss";
import { PokemonOptions } from "../../pages/planner/types";

export interface Props extends React.HTMLProps<HTMLDivElement> {
  options: PokemonOptions[];
}

function PokemonsContainer(props: Props) {
  const { options } = props;

  const pokemons = options.map((option, index) => (
    <div key={`pokemon_${index}`} className="puep-pokemon">
      <img src={option.url} alt="" height="88px" width="88px" />
      <div>{option.name.toUpperCase()}</div>
    </div>
  ));

  return <div className="puep-pokemons-container">{pokemons}</div>;
}

export default PokemonsContainer;
