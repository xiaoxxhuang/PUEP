import { render } from "@testing-library/react";
import Label from "./index";

describe("Render Label", () => {
  it("Should display with text `Primary Focus`, have class puep-label", () => {
    const { getByText } = render(
      <Label children="Primary Focus" className="puep-label" />
    );
    const labelElement = getByText("Primary Focus");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("puep-label");
    expect(labelElement).toHaveTextContent("Primary Focus");
  });
});
