import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      // Aquí puedes agregar headers de autenticación si es necesario
      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),
    createPost: builder.mutation<Post, { content: string }>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    likePost: builder.mutation<Post, string>({
      query: (postId) => ({
        url: `posts/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    commentPost: builder.mutation<Post, { postId: string; content: string }>({
      query: ({ postId, content }) => ({
        url: `posts/${postId}/comment`,
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useCommentPostMutation,
} = feedApi; 