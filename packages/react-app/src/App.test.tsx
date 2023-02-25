import { render } from "@testing-library/react";
import { MemoryRouter} from 'react-router-dom'
import App from "./App";

describe("Render App", () => {
  it("renders loading state while waiting for the lazily loaded components", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(getByText("Loading...")).toBeInTheDocument();
  });
});

