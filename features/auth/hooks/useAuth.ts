'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '../services/authApi';
import { LoginCredentials, RegisterCredentials } from '../types';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../model/authSlice';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      router.push('/feed');
      router.refresh();
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }, [loginMutation, dispatch, router]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const result = await registerMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      router.push('/feed');
      router.refresh();
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  }, [registerMutation, dispatch, router]);

  return {
    login,
    register,
    isLoading: isLoginLoading || isRegisterLoading,
    error: loginError || registerError,
  };
};
