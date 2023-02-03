import { render } from "@testing-library/react";
import PokemonsContainer from "./index";

describe("Render PokemonsContainer", () => {
  const options = [{ order: 1 }, { order: 2 }];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<PokemonsContainer options={options} />);
    expect(container.getElementsByClassName("puep-pokemon")).toHaveLength(2);
  });
});
