import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import { useAuth } from '@/features/auth/hooks/useAuth';

// Mock del hook useAuth
jest.mock('@/features/auth/hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('LoginPage', () => {
  beforeEach(() => {
    // Resetear los mocks entre tests
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  const renderLoginForm = () => {
    return render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  };

  it('debe renderizar el formulario correctamente', () => {
    renderLoginForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('debe mostrar errores de validación', async () => {
    renderLoginForm();
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it('debe llamar a login con las credenciales correctas', async () => {
    const mockLogin = jest.fn();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      register: jest.fn(),
      isLoading: false,
      error: null,
    });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('debe mostrar error de autenticación', async () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      error: 'Credenciales inválidas',
    });

    renderLoginForm();

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  it('debe mostrar estado de carga', () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      register: jest.fn(),
      isLoading: true,
      error: null,
    });

    renderLoginForm();

    expect(screen.getByRole('button', { name: /iniciando sesión/i })).toBeInTheDocument();
  });

  it('debe tener link al registro', () => {
    renderLoginForm();
    expect(screen.getByText(/¿no tienes una cuenta\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /regístrate/i })).toHaveAttribute('href', '/register');
  });
});
