import { render, screen } from "@testing-library/react";
import Title from "./index";

describe("Render Title", () => {
  describe("Render Current Effect Title", () => {
    it("Should display with text `Current Effect`, have class `Title`", () => {
      render(<Title children="Current Effect" />);
      const titleElement = screen.getByRole("heading", { level: 1 });
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveClass("puep-title");
      expect(titleElement).toHaveTextContent("Current Effect");
    });
  });
});
