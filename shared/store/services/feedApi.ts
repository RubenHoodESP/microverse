import { api } from './api';
import { Post } from '@/entities/post/Post';

export const feedApi = api.injectEndpoints({
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