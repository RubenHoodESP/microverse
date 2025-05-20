import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type LoginRequest = { username: string; password: string };
type LoginResponse = {
  token: string;
  user: { id: string; username: string; name: string };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
