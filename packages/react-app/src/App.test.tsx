import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();

  it("calls the onChange handler when a radio button is selected", () => {
    const radioButton2: HTMLInputElement = screen.getByLabelText('Attack');
    fireEvent.click(radioButton2);
    expect(radioButton2.checked).toEqual(true);
  });
});
