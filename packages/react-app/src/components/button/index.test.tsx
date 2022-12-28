import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("Render Button", () => {
  describe("Render Filter Button", () => {
    it("Should display with text `Filter`", () => {
      render(<Button children="Filter" disabled={false} />);
      const buttonElement = screen.getByRole("button", { name: /Filter/i });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("puep-button");
      expect(buttonElement).not.toBeDisabled();
      expect(buttonElement.firstChild).toHaveTextContent("Filter");
    });

    it("Should display with text `Filter`, and disabled when user clicked on it", () => {
      render(<Button children="Filter" disabled={true} />);
      const buttonElement = screen.getByRole("button", { name: /Filter/i });
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass("puep-button");
      expect(buttonElement).toBeDisabled();
      expect(buttonElement.firstChild).toHaveTextContent("Filter");
    });
  });
});
