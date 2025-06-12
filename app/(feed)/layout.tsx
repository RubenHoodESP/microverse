'use client';

import { memo } from 'react';
import Navbar from '@/features/navigation/components/Navbar';
import SuggestedUsers from '@/features/user/components/SuggestedUsers';

const StickySidebar = memo(({ children }: { children: React.ReactNode }) => (
  <aside className="hidden md:block md:flex-[0_0_25%] lg:flex-[0_0_20%] border-r border-gray-200">
    <div
      className={`
        sticky top-0
        h-screen
        px-4 py-6
        overflow-y-auto
      `}
    >
      {children}
    </div>
  </aside>
));

StickySidebar.displayName = 'StickySidebar';

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen">
      <StickySidebar>
        <Navbar />
      </StickySidebar>

      {/* Central feed */}
      <section className="w-full md:flex-[0_0_50%] lg:flex-[0_0_60%] border-r border-gray-200 px-4 py-6">
        {children}
      </section>

      <StickySidebar>
        <SuggestedUsers />
      </StickySidebar>
    </main>
  );
}
