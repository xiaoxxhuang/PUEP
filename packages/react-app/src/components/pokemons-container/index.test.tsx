import { render } from "@testing-library/react";
import PokemonsContainer from "./index";

describe("Render PokemonsContainer", () => {
  const options = [
    { name: "pikachu", url: "https://example.com/1.png" },
    { name: "absol", url: "https://example.com/2.png" },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<PokemonsContainer options={options} />);
    expect(container.getElementsByClassName("puep-pokemon")).toHaveLength(2);
  });
});
