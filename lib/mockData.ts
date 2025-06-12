// Datos simulados para desarrollo front-end
export const mockUsers = [
  {
    id: '1',
    email: 'usuario1@ejemplo.com',
    username: 'usuario1',
    name: 'Usuario Uno',
    image: 'https://i.pravatar.cc/150?img=1',
    bio: 'Este es un usuario de ejemplo'
  },
  {
    id: '2',
    email: 'usuario2@ejemplo.com',
    username: 'usuario2',
    name: 'Usuario Dos',
    image: 'https://i.pravatar.cc/150?img=2',
    bio: 'Otro usuario de ejemplo'
  }
];

// Función para simular una llamada a la API
export const mockApiCall = async <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}; 