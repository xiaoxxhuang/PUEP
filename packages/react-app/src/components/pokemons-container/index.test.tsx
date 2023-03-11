import { render } from "@testing-library/react";
import PokemonsContainer from "./index";

describe("Render PokemonsContainer", () => {
  const options = [
    { pk: "0001", name: "pikachu", url: "https://example.com/1.png" },
    { pk: "0002", name: "absol", url: "https://example.com/2.png" },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<PokemonsContainer options={options} value="" />);
    expect(container.getElementsByClassName("pokemon")).toHaveLength(2);
  });

  it("Should renders the correct classname for selected pokemon", () => {
    const { container } = render(<PokemonsContainer options={options} value="0001" />);

    expect(container.getElementsByClassName("pokemon")).toHaveLength(1);
    expect(container.getElementsByClassName("pokemon-selected")).toHaveLength(1);
  });
});
