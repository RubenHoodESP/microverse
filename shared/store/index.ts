import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '@/features/posts/services/postsApi';
import { authApi } from '@/features/auth/services/authApi'; 
import authReducer from '@/features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
