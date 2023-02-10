import { render } from "@testing-library/react";
import EmblemsContainer from "./index";

describe("Render EmblemsContainer", () => {
  const options = [
    { order: 1, rotateDegree: 0 },
    { order: 2, rotateDegree: 36 },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(
      <EmblemsContainer options={options}/>
    );
    expect(container.getElementsByClassName("puep-emblem")).toHaveLength(2);
  });
});
