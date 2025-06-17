import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';
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

describe('LoginPage', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      error: null,
      isLoading: false,
    });
  });

  it('debe renderizar el formulario correctamente', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('debe mostrar errores de validación', async () => {
    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await userEvent.click(submitButton);

    // Los campos son required, así que el navegador mostrará validaciones nativas
    expect(screen.getByPlaceholderText('Email')).toBeInvalid();
  });

  it('debe llamar a login con las credenciales correctas', async () => {
    render(<LoginPage />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Contraseña'), 'password123');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await userEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
  });

  it('debe mostrar error de autenticación', async () => {
    const mockError = 'Credenciales inválidas';
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      error: mockError,
      isLoading: false,
    });

    render(<LoginPage />);

    expect(screen.getByText(mockError)).toBeInTheDocument();
  });

  it('debe mostrar estado de carga', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      error: null,
      isLoading: true,
    });

    render(<LoginPage />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/iniciando sesión\.\.\./i);
    expect(button).toBeDisabled();
  });

  it('debe tener link al registro', () => {
    render(<LoginPage />);

    const registerLink = screen.getByText(/¿no tienes una cuenta\? regístrate/i);
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.getAttribute('href')).toBe('/register');
  });
});
