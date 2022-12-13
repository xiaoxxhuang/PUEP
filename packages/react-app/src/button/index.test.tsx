import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("Render Button", () => {
  describe("Render Filter Button", () => {
    it("Should display with text `Filter`, have class `Button`", () => {
      render(<Button children="Filter" className="Button" disabled={false} />);
      const buttonElement = screen.getByRole("button", { name: /Filter/i });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("Button");
      expect(buttonElement).not.toBeDisabled();
      expect(buttonElement.firstChild).toHaveTextContent("Filter");
    });

    it("Should display with text `Filter`, have class `Button`, and disabled when user clicked on it", () => {
      render(<Button children="Filter" disabled={true} className="Button" />);
      const buttonElement = screen.getByRole("button", { name: /Filter/i });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("Button");
      expect(buttonElement).toBeDisabled();
      expect(buttonElement.firstChild).toHaveTextContent("Filter");
    });
  });
});
