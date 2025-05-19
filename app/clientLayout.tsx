'use client';

import { useEffect } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('@/shared/mocks/browser').then(({ worker }) => {
        worker.start({ onUnhandledRequest: 'warn' });
      });
    }
  }, []);

  return <>{children}</>;
}
