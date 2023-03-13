import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import FilterFocus from "./index";

describe("Render RadioButtonGroup", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  it("Should renders the correct number of radio buttons", () => {
    const { getAllByRole } = render(
      <FilterFocus
        options={options}
        value="option1"
        title="Focus"
        onChange={() => {}}
      />
    );
    const radioButtons = getAllByRole("radio");
    expect(radioButtons).toHaveLength(2);
  });

  it("Should display the label with text `Focus`", () => {
    const { getByText } = render(
      <FilterFocus
        options={options}
        value="option1"
        title="Focus"
        onChange={() => {}}
      />
    );
    const labelElement = getByText("Focus");
    expect(labelElement).toHaveClass("puep-label");
  });
});
