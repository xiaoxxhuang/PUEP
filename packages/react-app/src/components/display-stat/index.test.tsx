import { render, screen } from "@testing-library/react";
import DisplayStat from "./index";

describe("Render DisplayStat", () => {
  const options = [
    { stat: "option1", value: "10" },
    { stat: "option2", value: "-20" },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<DisplayStat options={options} title="" />);
    expect(container.getElementsByClassName("display-stat")).toHaveLength(2);
  });

  it("Should display title with text `Effect`", () => {
    render(<DisplayStat options={options} title="Effect" />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveClass("display-title");
    expect(titleElement).toHaveTextContent("Effect");
  });
});
