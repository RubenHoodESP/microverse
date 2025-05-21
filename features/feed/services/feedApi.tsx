import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/entities/post/Post';

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { type: 'suggested' | 'following' }>({
      query: ({ type }) => `posts?type=${type}`,
    }),
  }),
});

export const { useGetPostsQuery } = feedApi;
