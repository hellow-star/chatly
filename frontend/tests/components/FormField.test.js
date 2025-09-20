import React from 'react';
import { render, screen } from '@testing-library/react';
import FormField from '../../src/components/FormField';

describe('FormField', () => {
  test('renders with label', () => {
    const register = jest.fn();
    render(<FormField label="Test Label" name="test" register={register} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('renders with icon when icon prop is provided', () => {
    const register = jest.fn();
    const { container } = render(
      <FormField
        label="Test Label"
        name="test"
        register={register}
        icon={<svg data-testid="test-icon" />}
      />
    );
    expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
  });
});