import React from 'react';
import { render, screen } from '@testing-library/react';
import '../Login/node_modules/@testing-library/jest-dom/extend-expect';
import Home from './Home';

describe('<Home />', () => {
  test('it should mount', () => {
    render(<Home />);
    
    const home = screen.getByTestId('Home');

    expect(home).toBeInTheDocument();
  });
});