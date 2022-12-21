import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("renders learn react link", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("Should render the App element", () => {
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("Should check a radio button when the radio button is selected", () => {
    const radioButton2: HTMLInputElement = screen.getByLabelText("Attack");
    fireEvent.click(radioButton2);
    expect(radioButton2.checked).toEqual(true);
  });
});
