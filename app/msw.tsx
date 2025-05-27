'use client';

import { useEffect } from 'react';

async function initMocks() {
  if (typeof window !== 'undefined') {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      const { worker } = await import('@/mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
    }
  }
}

export function MSWProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initMocks();
  }, []);

  return <>{children}</>;
}
