import { authService } from '@/features/auth/services/authService';

describe('authService', () => {
  beforeEach(() => {
    // Resetear los mocks entre tests
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  describe('login', () => {
    it('debe realizar login exitosamente', async () => {
      const mockResponse = {
        user: { id: 1, email: 'test@test.com', username: 'testuser' },
        token: 'fake-token'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const credentials = {
        email: 'test@test.com',
        password: 'password123'
      };

      const response = await authService.login(credentials);
      
      expect(response).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );
    });

    it('debe manejar errores de login', async () => {
      const errorMessage = 'Credenciales inválidas';
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      });

      const credentials = {
        email: 'wrong@test.com',
        password: 'wrongpass'
      };

      await expect(authService.login(credentials)).rejects.toThrow(errorMessage);
    });
  });

  describe('register', () => {
    it('debe registrar un usuario exitosamente', async () => {
      const mockResponse = {
        user: { id: 1, email: 'test@test.com', username: 'testuser' },
        token: 'fake-token'
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const credentials = {
        email: 'test@test.com',
        password: 'password123',
        username: 'testuser',
        name: 'Test User'
      };

      const response = await authService.register(credentials);
      
      expect(response).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );
    });

    it('debe manejar errores de registro', async () => {
      const errorMessage = 'El email ya está registrado';
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      });

      const credentials = {
        email: 'existing@test.com',
        password: 'password123',
        username: 'existinguser',
        name: 'Existing User'
      };

      await expect(authService.register(credentials)).rejects.toThrow(errorMessage);
    });
  });
}); 