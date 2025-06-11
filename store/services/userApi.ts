import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
}

interface UpdateUserProfile {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      // Aquí puedes agregar headers de autenticación si es necesario
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => 'user/me',
      providesTags: ['User'],
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `user/${userId}`,
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, UpdateUserProfile>({
      query: (body) => ({
        url: 'user/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    followUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `user/${userId}/follow`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    unfollowUser: builder.mutation<User, string>({
      query: (userId) => ({
        url: `user/${userId}/unfollow`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApi; 