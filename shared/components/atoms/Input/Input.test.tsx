import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');

    await userEvent.type(input, 'Hello, World!');
    expect(input).toHaveValue('Hello, World!');
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} id="test-input" />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies variant classes correctly', () => {
    render(<Input variant="error" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
  });

  it('applies size classes correctly', () => {
    render(<Input size="lg" />);
    expect(screen.getByRole('textbox')).toHaveClass('h-11');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('supports different input types', () => {
    render(<Input type="email" placeholder="Enter email" />);
    expect(screen.getByPlaceholderText('Enter email')).toHaveAttribute('type', 'email');
  });
});
