import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import "@testing-library/jest-dom"

test('renders add conversation button', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Add conversation/i);
  expect(linkElement).toBeInTheDocument();
});
