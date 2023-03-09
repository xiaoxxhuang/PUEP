import React from "react";
import "./index.scss";
import { PokemonOptions } from "../../pages/planner/types";

export interface Props {
  options: PokemonOptions[];
  value: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function PokemonsContainer(props: Props) {
  const { options, value, onClick } = props;

  const pokemons = options.map((option) => (
    <div
      key={option.pk}
      onClick={onClick}
      data-key={option.pk.split(":")[1]}
      data-name={option.name}
      className={
        value === option.pk.split(":")[1]
          ? "puep-pokemon-selected"
          : "puep-pokemon"
      }
    >
      <img src={option.url} alt="" height="88px" width="88px" />
      <div>{option.name.toUpperCase()}</div>
    </div>
  ));

  return <div className="puep-pokemons-container">{pokemons}</div>;
}

export default PokemonsContainer;
