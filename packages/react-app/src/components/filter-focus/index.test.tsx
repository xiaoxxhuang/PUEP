import { render } from "@testing-library/react";
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
        children="Focus"
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
        children="Focus"
        onChange={() => {}}
      />
    );
    const labelElement = getByText("Focus");
    expect(labelElement).toHaveClass("puep-label");
  });
});
