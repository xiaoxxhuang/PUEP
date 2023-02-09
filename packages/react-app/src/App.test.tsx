import { render, screen } from "@testing-library/react";
import App from "./App";

describe("renders puep app", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("Should render the App element", () => {
    const linkElement = screen.getByText(/Pokemon Unite Emblems Planner/i);
    expect(linkElement).toBeInTheDocument();
  });
});
