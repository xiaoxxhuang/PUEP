import { render } from "@testing-library/react";
import Stats from "./index";

describe("Render Label", () => {
  const options = [
    { stat: "option1", value: "10" },
    { stat: "option2", value: "-20" },
  ];
  it("Should renders the correct number of stats", () => {
    const { container } = render(
      <Stats options={options} />
    );
    expect(container.getElementsByClassName('puep-stat')).toHaveLength(2);
  });
});