import { http, HttpResponse } from 'msw';

type LoginRequestBody = {
  username: string;
  password: string;
};


export const authHandlers = [
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as LoginRequestBody;

    if (username === 'admin' && password === '1234') {
      return HttpResponse.json({ token: 'fake-jwt-token', user: { name: 'admin' } });
    }

    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }),
];
