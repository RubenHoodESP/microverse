import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '@/features/posts/services/postsApi';
import { authApi } from '@/features/auth/services/authApi'; 
import authReducer from '@/features/auth/model/authSlice';
import { feedApi } from '@/features/feed/services/feedApi';
import { userApi } from '@/features/user/services/userApi';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, authApi.middleware, feedApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
