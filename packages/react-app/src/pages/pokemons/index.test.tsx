import { render } from '@testing-library/react';
import Pokemons from './index';

describe('Pokemons page', () => {
  it('renders the header and the content', () => {
    const { getByText } = render(<Pokemons />);
    expect(getByText('This page is for the information for all pokemons')).toBeInTheDocument();
  });
});