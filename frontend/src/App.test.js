import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const element = render(<App />);
  const linkElement = element.getByText(/Действия/i);
  expect(linkElement).toBeInTheDocument();
});
