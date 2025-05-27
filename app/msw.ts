'use client';

import { useEffect } from 'react';

async function initMocks() {
  if (typeof window !== 'undefined') {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      try {
        const { worker } = await import('@/mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js',
            options: {
              scope: '/',
            },
          },
        });
        console.log('MSW iniciado correctamente');
      } catch (error) {
        console.error('Error al iniciar MSW:', error);
      }
    }
  }
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initMocks();
  }, []);

  return <>{children}</>;
} 