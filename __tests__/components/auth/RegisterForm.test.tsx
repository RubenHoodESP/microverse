import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/app/register/page';
import { useAuth } from '@/hooks/useAuth';

// Mock del hook useAuth
jest.mock('@/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('RegisterPage', () => {
  const mockRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
    });
  });

  it('debe renderizar el formulario correctamente', () => {
    render(<RegisterPage />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('debe validar campos requeridos', async () => {
    render(<RegisterPage />);

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent('Todos los campos son requeridos');
  });

  it('debe validar formato de email', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'invalidemail');
    await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    await userEvent.type(screen.getByPlaceholderText(/contraseña/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent('Por favor, introduce un email válido');
  });

  it('debe validar longitud mínima de contraseña', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    await userEvent.type(screen.getByPlaceholderText(/contraseña/i), '12345');

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent('La contraseña debe tener al menos 6 caracteres');
  });

  it('debe llamar a register con datos válidos', async () => {
    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    await userEvent.type(screen.getByPlaceholderText(/contraseña/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    await userEvent.click(submitButton);

    expect(mockRegister).toHaveBeenCalledWith('testuser', 'test@test.com', 'password123');
  });

  it('debe manejar errores de registro', async () => {
    const mockError = 'El email ya está registrado';
    (useAuth as jest.Mock).mockReturnValue({
      register: jest.fn().mockRejectedValue(new Error(mockError)),
      isLoading: false,
    });

    render(<RegisterPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Username'), 'testuser');
    await userEvent.type(screen.getByPlaceholderText(/contraseña/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /registrarse/i });
    await userEvent.click(submitButton);

    const errorMessage = await screen.findByRole('alert');
    expect(errorMessage).toHaveTextContent(/ha ocurrido un error durante el registro/i);
  });

  it('debe tener link al login', () => {
    render(<RegisterPage />);

    const loginText = screen.getByText(/¿ya tienes una cuenta\?/i);
    expect(loginText).toBeInTheDocument();
    const loginLink = screen.getByText(/inicia sesión/i);
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
