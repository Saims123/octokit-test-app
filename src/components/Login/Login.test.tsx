import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('<Github />', () => {
  test('it should mount', () => {
    render(<Login />);
    
    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});