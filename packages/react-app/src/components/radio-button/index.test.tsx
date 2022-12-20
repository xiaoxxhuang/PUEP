import { render } from "@testing-library/react";
import RadioButtonGroup from "./index";

describe("Render RadioButtonGroup", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];
  it("Should renders the correct number of radio buttons", () => {
    const { getAllByRole } = render(
      <RadioButtonGroup options={options} value="option1" onChange={() => {}} />
    );
    const radioButtons = getAllByRole("radio");
    expect(radioButtons).toHaveLength(2);
  });
});
