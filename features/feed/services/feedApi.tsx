import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FeedType } from '../components/FeedContainer';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], FeedType>({
      query: (type) => `/posts?type=${type}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
      // Mantener los datos en caché por 5 minutos
      keepUnusedDataFor: 300,
    }),
    createPost: builder.mutation<Post, { content: string }>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
      }),
      // Invalidar la lista completa de posts
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = feedApi;
