import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/entities/user/User';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getSuggestedUsers: builder.query<User[], void>({
      query: () => 'users/suggested',
    }),
  }),
});

export const { useGetSuggestedUsersQuery } = userApi;
