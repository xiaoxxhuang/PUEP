import { render, screen } from "@testing-library/react";
import PuepHeader from "./index";

describe("Render PuepHeader", () => {
  it("Should display the header with title", () => {
    render(<PuepHeader/>);
    const paragraphElement = screen.getByText("Pokemon Unite Emblems Planner");
    expect(paragraphElement).toBeInTheDocument();
  });
});