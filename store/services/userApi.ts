import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  isFollowing?: boolean;
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
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      console.log('🚀 Preparando headers para la petición');
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('next-auth.session-token='))
        ?.split('=')[1];

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['User', 'Following'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => {
        console.log('🔍 Ejecutando query getCurrentUser');
        return 'users/me';
      },
      transformResponse: (response: User) => {
        console.log('✅ Respuesta getCurrentUser:', response);
        return response;
      },
      providesTags: ['User'],
    }),
    getSuggestedUsers: builder.query<User[], void>({
      query: () => {
        console.log('🔍 Ejecutando query getSuggestedUsers');
        return 'users/suggested';
      },
      transformResponse: (response: User[]) => {
        console.log('✅ Respuesta getSuggestedUsers:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error('❌ Error en getSuggestedUsers:', response);
        return response;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'SUGGESTED' },
            ]
          : [{ type: 'User', id: 'SUGGESTED' }],
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `users/${userId}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateProfile: builder.mutation<User, UpdateUserProfile>({
      query: (body) => ({
        url: 'users/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    followUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}/follow`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'User', id: userId },
        { type: 'User', id: 'SUGGESTED' },
        { type: 'Following', id: 'LIST' },
      ],
    }),
    unfollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}/unfollow`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, userId) => [
        { type: 'User', id: userId },
        { type: 'User', id: 'SUGGESTED' },
        { type: 'Following', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetSuggestedUsersQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = userApi; 