import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Header from "./index";

describe('Render Header', () => {
  it('Should renders header and links correctly', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  
    const logo = getByAltText('Pokemon Unite Logo');
    expect(logo).toBeInTheDocument();

    const plannerLink = getByText('Planner');
    expect(plannerLink).toBeInTheDocument();
    expect(plannerLink.getAttribute('href')).toBe('/planner');

    const emblemsLink = getByText('Emblems');
    expect(emblemsLink).toBeInTheDocument();
    expect(emblemsLink.getAttribute('href')).toBe('/emblems');

    const pokemonsLink = getByText('Pokemons');
    expect(pokemonsLink).toBeInTheDocument();
    expect(pokemonsLink.getAttribute('href')).toBe('/pokemons');
  });
});