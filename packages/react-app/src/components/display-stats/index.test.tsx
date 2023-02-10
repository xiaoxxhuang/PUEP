import { render, screen } from "@testing-library/react";
import DisplayStats from "./index";

describe("Render DisplayStats", () => {
  const options = [
    { stat: "option1", value: "10" },
    { stat: "option2", value: "-20" },
  ];

  it("Should renders the correct number of stats", () => {
    const { container } = render(<DisplayStats options={options} title="" />);
    expect(container.getElementsByClassName("puep-stat")).toHaveLength(2);
  });

  it("Should display title with text `Effect`", () => {
    render(<DisplayStats options={options} title="Effect" />);
    const titleElement = screen.getByRole("heading", { level: 1 });
    expect(titleElement).toHaveClass("puep-title");
    expect(titleElement).toHaveTextContent("Effect");
  });
});
