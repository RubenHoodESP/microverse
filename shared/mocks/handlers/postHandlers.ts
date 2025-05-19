import { http, HttpResponse } from 'msw';

type PostInput = {
  title: string;
  content: string;
};

export const postHandlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: '1', title: 'Post 1', content: 'Contenido 1' },
      { id: '2', title: 'Post 2', content: 'Contenido 2' },
    ]);
  }),

  http.post('/api/posts', async ({ request }) => {
    const newPost = await request.json() as PostInput;
    return HttpResponse.json({ id: String(Date.now()), ...newPost }, { status: 201 });
  }),
];
