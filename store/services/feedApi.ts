import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/entities/post/Post';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
    }),
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = feedApi;