import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock de next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('useAuth', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
  });

  describe('login', () => {
    it('debe manejar login exitoso', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({ error: null });
      (require('next-auth/react') as any).signIn = mockSignIn;

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('test@test.com', 'password123');
      });

      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@test.com',
        password: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
      expect(result.current.error).toBeNull();
    });

    it('debe manejar error de login', async () => {
      const mockSignIn = jest.fn().mockResolvedValue({ error: 'Credenciales inválidas' });
      (require('next-auth/react') as any).signIn = mockSignIn;

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('wrong@test.com', 'wrongpass');
      });

      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'wrong@test.com',
        password: 'wrongpass',
      });
      expect(mockPush).not.toHaveBeenCalled();
      expect(result.current.error).toBe('Credenciales inválidas');
    });
  });

  describe('register', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('debe manejar registro exitoso', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: { id: 1 }, token: 'fake-token' }),
      });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.register('testuser', 'test@test.com', 'password123', 'Test User');
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@test.com',
          password: 'password123',
          name: 'Test User',
        }),
      });
      expect(result.current.error).toBeNull();
    });

    it('debe manejar error de registro', async () => {
      const errorMessage = 'El email ya está registrado';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage }),
      });

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.register('existinguser', 'existing@test.com', 'password123');
      });

      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('logout', () => {
    it('debe realizar logout correctamente', async () => {
      const mockSignOut = jest.fn().mockResolvedValue(undefined);
      (require('next-auth/react') as any).signOut = mockSignOut;

      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
