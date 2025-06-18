'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation, useRegisterMutation } from '../services/authApi';
import { LoginCredentials, RegisterCredentials } from '../types';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials } from '../model/authSlice';
import { useGetCurrentUserQuery } from '@/shared/store/services/userApi';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading, error: registerError }] = useRegisterMutation();
  const { data: user, isLoading: isUserLoading } = useGetCurrentUserQuery();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      console.log('🔑 useAuth - Iniciando login con:', credentials.email);
      const result = await loginMutation(credentials).unwrap();
      console.log('✅ useAuth - Login exitoso, resultado:', result);
      
      // Guardar el token en las cookies
      Cookies.set('token', result.token, { expires: 7 }); // Expira en 7 días
      console.log('🍪 useAuth - Token guardado en cookies');
      
      dispatch(setCredentials(result));
      console.log('💾 useAuth - Credenciales guardadas en Redux');
      
      console.log('🔄 useAuth - Intentando redirección a /');
      router.push('/');
      router.refresh();
      console.log('✅ useAuth - Redirección completada');
    } catch (error) {
      console.error('❌ useAuth - Error en login:', error);
      throw error;
    }
  }, [loginMutation, dispatch, router]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      console.log('🔑 useAuth - Iniciando registro con:', credentials.email);
      const result = await registerMutation(credentials).unwrap();
      console.log('✅ useAuth - Registro exitoso, resultado:', result);
      
      // Guardar el token en las cookies
      Cookies.set('token', result.token, { expires: 7 }); // Expira en 7 días
      console.log('🍪 useAuth - Token guardado en cookies');
      
      dispatch(setCredentials(result));
      console.log('💾 useAuth - Credenciales guardadas en Redux');
      
      console.log('🔄 useAuth - Intentando redirección a /');
      router.push('/');
      router.refresh();
      console.log('✅ useAuth - Redirección completada');
    } catch (error) {
      console.error('❌ useAuth - Error en registro:', error);
      throw error;
    }
  }, [registerMutation, dispatch, router]);

  const logout = useCallback(() => {
    console.log('🔒 useAuth - Iniciando logout');
    // Eliminar el token de las cookies
    Cookies.remove('token');
    console.log('🍪 useAuth - Token eliminado de cookies');
    
    dispatch(clearCredentials());
    console.log('💾 useAuth - Credenciales eliminadas de Redux');
    
    router.push('/login');
    router.refresh();
    console.log('✅ useAuth - Redirección a login completada');
  }, [dispatch, router]);

  return {
    user,
    login,
    register,
    logout,
    isLoading: isLoginLoading || isRegisterLoading || isUserLoading,
    error: loginError || registerError,
    isAuthenticated: !!user,
  };
};
