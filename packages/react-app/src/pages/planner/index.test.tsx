import { render, screen, fireEvent } from "@testing-library/react";
import Planner from "./index";

describe("renders learn react link", () => {
  beforeEach(() => {
    render(<Planner />);
  });

  it("Should render the App element", () => {
    const linkElement = screen.getByText(/Pokemon Unite Emblems Planner/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("Should check a radio button when the radio button is selected", () => {
    const attackRadioButtons: HTMLInputElement[] =
      screen.getAllByLabelText("Attack");
    expect(attackRadioButtons[0]).not.toBeChecked();
    fireEvent.click(attackRadioButtons[0]);
    expect(attackRadioButtons[0]).toBeChecked();
  });
});
