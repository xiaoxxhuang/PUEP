import { render } from '@testing-library/react';
import Emblems from './index';

describe('Emblems page', () => {
  it('renders the header and the content', () => {
    const { getByText } = render(<Emblems />);
    expect(getByText('This page is for the information for all emblems')).toBeInTheDocument();
  });
});