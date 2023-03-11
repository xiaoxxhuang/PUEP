import { render, screen, fireEvent } from "@testing-library/react";
import Planner from "./index";
// import { ComponentProps } from "react";
// import { useSearchParams } from "react-router-dom";

// import FilterFocus from "../../components/filter-focus";
// import DisplayStat from "../../components/display-stat";
// import EmblemsContainer from "../../components/emblems-container";
// import PokemonsContainer from "../../components/pokemons-container";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: () => [
    new URLSearchParams({
      primary: "hp",
      secondary: "attack",
      pokemon: "0001",
    }),
  ],
}));

jest.mock("../../components/filter-focus", () => ({
  __esModule: true,
  default: () => <div data-testid="filter-focus" />,
}));

jest.mock("../../components/display-stat", () => ({
  __esModule: true,
  default: () => <div data-testid="display-stat" />,
}));

jest.mock("../../components/emblems-container", () => ({
  __esModule: true,
  default: () => <div data-testid="emblems-container" />,
}));

jest.mock("../../components/pokemons-container", () => ({
  __esModule: true,
  default: () => <div data-testid="pokemons-container" />,
}));

describe("Emblems planner page", () => {
  it("Should renders sucessfully without error", () => {
    render(<Planner />);
  });

  it("Should renders all elements in planner page", () => {
    render(<Planner />);
    const filterFocus = screen.getAllByTestId("filter-focus");
    const displayStat = screen.getAllByTestId("display-stat");
    const emblemsContainer = screen.getByTestId("emblems-container");
    const pokemonsContainer = screen.getByTestId("pokemons-container");
    
    expect(filterFocus).toHaveLength(2);
    expect(displayStat).toHaveLength(2);
    expect(emblemsContainer).toBeInTheDocument();
    expect(pokemonsContainer).toBeInTheDocument();
  });

  // it("Should check a radio button when the radio button is selected", () => {
  // render(<Planner />)
  // const attackRadioButtons: HTMLInputElement[] =
  //   screen.getAllByLabelText("Attack");
  // expect(attackRadioButtons[0]).not.toBeChecked();
  // fireEvent.click(attackRadioButtons[0]);
  // expect(attackRadioButtons[0]).toBeChecked();
  // });
});
