import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Login básico para pruebas
  http.post(`${API_URL}/auth/login`, () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test User',
      },
      token: 'fake-jwt-token',
    });
  }),
];