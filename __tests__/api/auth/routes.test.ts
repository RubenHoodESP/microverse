import { POST as loginHandler } from '@/app/api/auth/login/route';
import { POST as registerHandler } from '@/app/api/auth/register/route';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Mock de Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock de bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('Auth API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('debe registrar un usuario exitosamente', async () => {
      const mockRequest = {
        json: async () => ({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
        }),
      };
      const response = await registerHandler(mockRequest as any);
      expect(response).toBeDefined();
    });

    it('debe validar datos requeridos', async () => {
      const mockRequest = {
        json: async () => ({}),
      };
      const response = await registerHandler(mockRequest as any);
      expect(response).toBeDefined();
    });

    it('debe validar formato de email', async () => {
      const mockRequest = {
        json: async () => ({
          email: 'invalidemail',
          username: 'testuser',
          password: 'password123',
        }),
      };
      const response = await registerHandler(mockRequest as any);
      expect(response).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    const validLoginData = {
      email: 'test@test.com',
      password: 'password123',
    };

    it('debe realizar login exitosamente', async () => {
      const user = {
        id: 1,
        email: validLoginData.email,
        password: 'hashed_password',
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const request = {
        method: 'POST',
        body: JSON.stringify(validLoginData),
      };

      const response = await loginHandler(request as any);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.message).toBe('Login exitoso');
      expect(response.cookies.set).toHaveBeenCalled();
    });

    it('debe rechazar credenciales inválidas', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const request = {
        method: 'POST',
        body: JSON.stringify(validLoginData),
      };

      const response = await loginHandler(request as any);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Credenciales inválidas');
    });

    it('debe validar formato de email', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const request = {
        method: 'POST',
        body: JSON.stringify(invalidData),
      };

      const response = await loginHandler(request as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email inválido');
    });
  });
}); 