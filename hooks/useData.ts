import { useState, useEffect } from 'react';
import { mockUsers, mockApiCall } from '../lib/mockData';

// Tipo para los datos de usuario
export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string;
  bio?: string;
}

// Hook personalizado para manejar datos
export function useData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (process.env.MOCK_MODE === 'true') {
          // Modo simulado
          const mockData = await mockApiCall(mockUsers as T);
          setData(mockData);
        } else {
          // Modo real (cuando implementes el backend)
          const response = await fetch(`/api/${endpoint}`);
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          const realData = await response.json();
          setData(realData);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
} 