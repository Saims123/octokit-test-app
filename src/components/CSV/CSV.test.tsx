import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CSV from './CSV';

describe('<CSV />', () => {
  test('it should mount', () => {
    render(<CSV />);
    
    const csv = screen.getByTestId('CSV');

    expect(csv).toBeInTheDocument();
  });
});