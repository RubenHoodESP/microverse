'use client';

import { useEffect, useState } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/shared/mocks/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'warn' }).then(() => {
          console.log('✅ MSW ready');
          setMswReady(true);
        });
      });
    }
  }, []);

  if (!mswReady) return null; // Esperamos antes de renderizar la app

  return <>{children}</>;
}
