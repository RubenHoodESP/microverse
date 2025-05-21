// app/(feed)/layout.tsx

import Navbar from '@/features/navigation/components/Navbar';
import SuggestedUsers from '@/features/user/components/SuggestedUsers';

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col md:flex-row max-w-[1200px] mx-auto min-h-screen">
      {/* Left sidebar */}
      <aside className="hidden md:block md:w-[250px] border-r border-gray-200 px-4 py-6">
        <Navbar />
      </aside>

      {/* Central feed */}
      <section className="w-full md:w-[min(700px,100%)] border-r border-gray-200 px-4 py-6">
        {children}
      </section>

      {/* Right sidebar */}
      <aside className="hidden lg:block lg:w-[300px] px-4 py-6">
        <SuggestedUsers />
      </aside>
    </main>
  );
}
