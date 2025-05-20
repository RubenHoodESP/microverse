import { http, HttpResponse } from 'msw';

type LoginRequestBody = {
  username: string;
  password: string;
};


export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as LoginRequestBody;

    if (username === 'admin' && password === '1234') {
      return HttpResponse.json({
        token: 'mock-token',
        user: { id: '1', username: 'admin', name: 'Administrador' },
      });
    }

    return HttpResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
  }),
];
