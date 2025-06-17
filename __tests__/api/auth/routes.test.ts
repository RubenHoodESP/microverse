import { NextRequest, NextResponse } from 'next/server';
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

// Mock de NextResponse
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    NextResponse: {
      json: jest.fn().mockImplementation((data, init) => ({
        ...new actual.NextResponse(),
        json: () => Promise.resolve(data),
        status: init?.status || 200,
        cookies: {
          set: jest.fn(),
        },
      })),
    },
  };
});

describe('Auth API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    const validRegisterData = {
      email: 'test@test.com',
      username: 'testuser',
      password: 'password123',
      name: 'Test User',
    };

    it('debe registrar un nuevo usuario exitosamente', async () => {
      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...validRegisterData,
        password: hashedPassword,
      });

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(validRegisterData),
      });

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.user).toBeDefined();
      expect(data.token).toBeDefined();
      expect(data.user.password).toBeUndefined();
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...validRegisterData,
          password: hashedPassword,
        },
      });
    });

    it('debe rechazar registro con email existente', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({ 
        id: 1, 
        email: validRegisterData.email 
      });

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(validRegisterData),
      });

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('El usuario o email ya existe');
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('debe validar datos de entrada', async () => {
      const invalidData = {
        email: 'invalid-email',
        username: 'te',
        password: '123',
      };

      const request = new NextRequest('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await registerHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(prisma.user.create).not.toHaveBeenCalled();
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

      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(validLoginData),
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toBeDefined();
      expect(data.message).toBe('Login exitoso');
      expect(response.cookies.set).toHaveBeenCalled();
    });

    it('debe rechazar credenciales inválidas', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(validLoginData),
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Credenciales inválidas');
    });

    it('debe validar formato de email', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
      };

      const request = new NextRequest('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(invalidData),
      });

      const response = await loginHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email inválido');
    });
  });
}); 