import { http, HttpResponse } from 'msw';

export const userHandlers = [
  http.get('/api/users/suggested', () => {
    return HttpResponse.json([
      { id: '1', name: 'Ana Pérez', username: 'ana_dev' },
      { id: '2', name: 'Luis García', username: 'garcia_luis' },
      { id: '3', name: 'Marta Ruiz', username: 'mruiz' },
    ]);
  }),
];
