import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the app with All products text', () => {
  render(<App />);
  const linkElement = screen.getByText(/all products/i);
  expect(linkElement).toBeInTheDocument();
});
