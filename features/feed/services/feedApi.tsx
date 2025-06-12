import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/entities/post/Post';
import { mockPosts } from '@/shared/mocks/mockPosts';

// Función para simular un delay en las llamadas mock
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { type: 'suggested' | 'following' }>({
      queryFn: async ({ type }) => {
        // Por ahora, siempre usamos los datos mock
        await delay(1000); // Simulamos un delay para mostrar el estado de carga
        return { data: mockPosts };

        // TODO: Implementar la llamada real cuando la API esté lista
        // const result = await baseQuery(`posts?type=${type}`);
        // if (result.error) {
        //   return { error: result.error };
        // }
        // return { data: result.data as Post[] };
      },
    }),
  }),
});

export const { useGetPostsQuery } = feedApi;
