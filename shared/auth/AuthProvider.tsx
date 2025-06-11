'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // TODO: Implementar la lógica real de autenticación
  // Por ahora, retornamos un usuario de prueba
  const user: User = {
    id: '1',
    username: 'usuario_ejemplo',
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: false,
        error: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
