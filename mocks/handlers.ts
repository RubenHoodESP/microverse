import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();
    
    if (body.email === 'test@example.com' && body.password === 'password') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: body.email,
          username: 'testuser',
          name: 'Test User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'fake-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // Register
  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    const body = await request.json();
    
    return HttpResponse.json({
      user: {
        id: '1',
        email: body.email,
        username: body.username,
        name: body.name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'fake-jwt-token',
    });
  }),

  // Get Current User
  http.get(`${API_URL}/auth/me`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    
    if (authHeader === 'Bearer fake-jwt-token') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'test@example.com',
          username: 'testuser',
          name: 'Test User',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token: 'fake-jwt-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),

  // Logout
  http.post(`${API_URL}/auth/logout`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
]; 