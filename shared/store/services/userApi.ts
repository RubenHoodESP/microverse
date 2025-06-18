import { api } from './api';
import { User } from '@/features/auth/types';

interface UpdateUserProfile {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => 'users/me',
    }),
    getSuggestedUsers: builder.query<User[], void>({
      query: () => 'users/suggested',
    }),
    getUserById: builder.query<User, string>({
      query: (userId) => `users/${userId}`,
    }),
    updateProfile: builder.mutation<User, UpdateUserProfile>({
      query: (body) => ({
        url: 'users/profile',
        method: 'PATCH',
        body,
      }),
    }),
    followUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}/follow`,
        method: 'POST',
      }),
    }),
    unfollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `users/${userId}/unfollow`,
        method: 'POST',
      }),
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