'use client';

import React, { useEffect, useState } from 'react';
import { initMocks } from '../mocks';

interface MSWProviderProps {
  children: React.ReactNode;
}

export function MSWProvider({ children }: MSWProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const initialize = async () => {
      try {
        console.log('[MSW] Iniciando MSWProvider...');
        console.log('[MSW] NODE_ENV:', process.env.NODE_ENV);

        // Esperar a que el DOM esté completamente cargado
        if (document.readyState !== 'complete') {
          await new Promise((resolve) => {
            window.addEventListener('load', resolve);
          });
        }

        const success = await initMocks();
        setIsInitialized(success);
        setDebugInfo(`Estado: ${success ? 'Inicializado' : 'Falló'}`);
        if (!success) {
          const error = new Error('No se pudo inicializar MSW');
          console.error('[MSW] Error de inicialización:', error);
          setError(error);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        const error = err instanceof Error ? err : new Error('Error desconocido');
        console.error('[MSW] Error detallado:', error);
        setError(error);
        setDebugInfo(`Error: ${errorMessage}`);
        setIsInitialized(false);
      }
    };

    initialize();
  }, [mounted]);

  // Durante SSR, renderizamos un placeholder que coincida con el estado inicial del cliente
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Inicializando...</h2>
          <p className="text-gray-600 mb-2">Por favor, espera un momento</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-red-800 mb-4">Error de MSW</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <div className="bg-red-100 p-4 rounded">
            <p className="text-sm text-red-800">{debugInfo}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Inicializando MSW...</h2>
          <p className="text-gray-600 mb-2">Por favor, espera un momento</p>
          <p className="text-sm text-gray-500">{debugInfo}</p>
          <p className="text-xs text-gray-400 mt-2">NODE_ENV: {process.env.NODE_ENV}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
