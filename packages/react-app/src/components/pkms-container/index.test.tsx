import { render } from "@testing-library/react";
import PkmsContainer from "./index";

describe("Render PkmsContainer", () => {
  const options = [{ order: 1 }, { order: 2 }];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<PkmsContainer options={options} />);
    expect(container.getElementsByClassName("puep-pkm")).toHaveLength(2);
  });
});
