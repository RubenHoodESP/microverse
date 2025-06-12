import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/entities/post/Post';
import { mockPosts } from '@/shared/mocks/mockPosts';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      // Si MOCK_MODE es true, devolvemos los posts mockeados
      transformResponse: (response: Post[]) => {
        if (process.env.MOCK_MODE === 'true') {
          return mockPosts;
        }
        return response;
      },
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
