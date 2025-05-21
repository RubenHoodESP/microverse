'use client';

import { useState } from 'react';
import FeedTabs from './FeedTabs';
import PostList from './PostList';

export type FeedType = 'suggested' | 'following';

export default function FeedContainer() {
  const [feedType, setFeedType] = useState<FeedType>('suggested');

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl shadow">
        Este bloque cambia con el tema
      </div>

      <FeedTabs selected={feedType} onSelect={setFeedType} />
      <PostList type={feedType} />
    </div>
  );
}
