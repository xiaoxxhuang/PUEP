import { render } from "@testing-library/react";
import EmblemsContainer from "./index";

describe("Render EmblemsContainer", () => {
  const imageUrls = [
    "https://example.com/image1.png",
    "https://example.com/image2.png",
  ];

  it("renders emblems with image provided", () => {
    const { container } = render(<EmblemsContainer imageUrls={imageUrls} />);

    expect(
      container.getElementsByClassName("puep-circle")[0].children[0]
    ).toHaveAttribute("src", imageUrls[0]);
    expect(
      container.getElementsByClassName("puep-circle")[0].children[0]
    ).toHaveAttribute("height", "85px");
    expect(
      container.getElementsByClassName("puep-circle")[0].children[0]
    ).toHaveAttribute("width", "85px");
  });

  it("renders the correct number of emblems", () => {
    const { container } = render(<EmblemsContainer imageUrls={imageUrls} />);
    expect(container.getElementsByClassName("puep-emblem")).toHaveLength(10);
  });

  it("renders the correct number of imageUrls", () => {
    const { getByText } = render(<EmblemsContainer imageUrls={imageUrls} />);

    const imageNumber = getByText(`${imageUrls.length}/10`);
    expect(imageNumber).toBeInTheDocument();
  });
});
