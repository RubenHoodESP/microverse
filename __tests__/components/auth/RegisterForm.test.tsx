import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';
import { useAuth } from '@/features/auth/hooks/useAuth';

// Mock del hook useAuth
jest.mock('@/features/auth/hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('RegisterForm', () => {
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

  const renderRegisterForm = () => {
    return render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
  };

  it('debe mostrar errores si los campos requeridos están vacíos', async () => {
    renderRegisterForm();
    const submitButton = screen.getByRole('button', { name: /registrarse/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el nombre de usuario es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  it('debe mostrar error si el email es inválido', async () => {
    renderRegisterForm();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });

  it('debe redirigir al home tras registro exitoso', async () => {
    const mockRegister = jest.fn();
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      register: mockRegister,
      isLoading: false,
      error: null,
    });

    renderRegisterForm();

    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
      target: { value: 'johndoe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'password123',
      });
    });
  });

  it('debe mostrar error si el registro falla', async () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      register: jest.fn(),
      isLoading: false,
      error: 'El email ya está registrado',
    });

    renderRegisterForm();

    await waitFor(() => {
      expect(screen.getByText(/el email ya está registrado/i)).toBeInTheDocument();
    });
  });
});
