import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from '@/features/posts/services/postsApi';
import { authApi } from '@/features/auth/services/authApi'; 
import authReducer from '@/features/auth/model/authSlice';
import { feedApi } from '@/shared/store/services/feedApi';
import { userApi } from '@/shared/store/services/userApi';
import postsReducer from '@/shared/store/slices/postsSlice';

export const store = configureStore({
  reducer: {
    // RTK Query APIs
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [feedApi.reducerPath]: feedApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    
    // Slices
    auth: authReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      postsApi.middleware,
      authApi.middleware,
      feedApi.middleware,
      userApi.middleware
    ),
});

// Configurar los listeners para RTK Query
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
