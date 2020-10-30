import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Github from './Github';

describe('<Github />', () => {
  test('it should mount', () => {
    render(<Github />);
    
    const github = screen.getByTestId('Github');

    expect(github).toBeInTheDocument();
  });
});