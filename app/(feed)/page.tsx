// app/(feed)/page.tsx

'use client';

import { useState, Suspense, lazy } from 'react';
import { useSession } from 'next-auth/react';
import { FeedType } from '@/features/feed/components/FeedContainer';

// Lazy load components
const FeedContainer = lazy(() => import('@/features/feed/components/FeedContainer'));

// Loading component
const FeedLoading = () => (
  <div className="flex flex-col gap-4">
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
  </div>
);

export default function FeedPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Por favor, inicia sesión para ver el contenido.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<FeedLoading />}>
      <FeedContainer />
    </Suspense>
  );
}
