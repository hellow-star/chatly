import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../src/components/Card';

describe('Card', () => {
  test('renders children', () => {
    render(<Card><div>Test content</div></Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});