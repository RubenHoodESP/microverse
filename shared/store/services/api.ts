import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      // Obtener el token de las cookies
      const token = Cookies.get('token');
      
      // Si hay un token, añadirlo al header de autorización
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: () => ({}),
}); 