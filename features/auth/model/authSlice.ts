import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, AuthResponse } from '../types';

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      console.log('🔑 authSlice - Estableciendo credenciales:', action.payload);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      console.log('✅ authSlice - Credenciales establecidas:', state);
    },
    clearCredentials: (state) => {
      console.log('🔒 authSlice - Limpiando credenciales');
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      console.log('✅ authSlice - Credenciales limpiadas:', state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
