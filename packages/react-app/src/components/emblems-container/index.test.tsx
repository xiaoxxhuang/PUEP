import { render } from "@testing-library/react";
import EmblemsContainer from "./index";

describe("Render EmblemsContainer", () => {
  const options = [
    { order: 1, rotateDegree: 0, imageUrl: "http://example.com" },
    { order: 2, rotateDegree: 36, imageUrl: "http://example.com" },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(
      <EmblemsContainer options={options}/>
    );
    expect(container.getElementsByClassName("puep-emblem")).toHaveLength(2);
  });
});
