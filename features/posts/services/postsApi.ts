import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/entities/post/Post';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
