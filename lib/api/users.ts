import { User } from '@/types/user';

export async function getUserProfile(username: string): Promise<User> {
  // TODO: Implementar la llamada real a la API
  // Por ahora, retornamos un usuario de prueba
  return {
    id: '1',
    username,
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
} 