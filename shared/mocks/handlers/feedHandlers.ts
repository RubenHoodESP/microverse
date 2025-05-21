import { http, HttpResponse } from 'msw';

export const feedHandlers = [
  http.get('/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    if (type === 'following') {
      return HttpResponse.json([
        { id: '1', title: 'Post de seguido', content: 'Contenido 1' },
        { id: '2', title: 'Otro seguido', content: 'Contenido 2' },
      ]);
    }

    return HttpResponse.json([
      { id: '3', title: 'Post sugerido', content: 'Contenido sugerido A' },
      { id: '4', title: 'Post sugerido 2', content: 'Contenido sugerido B' },
    ]);
  }),
];
