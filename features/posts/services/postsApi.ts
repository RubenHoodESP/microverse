import { Post } from '@/entities/post/Post';
import { mockPosts } from '@/shared/mocks/mockPosts';
import { api } from '@/shared/store/services/api';

export const postsApi = api.injectEndpoints({
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
    getUserPosts: builder.query<Post[], string>({
      query: (userId) => `posts?userId=${userId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetUserPostsQuery } = postsApi;
