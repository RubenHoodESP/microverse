'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '@/shared/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
