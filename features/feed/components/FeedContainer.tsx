'use client';

import { useState } from 'react';
import FeedTabs from './FeedTabs';
import PostList from './PostList';

export type FeedType = 'suggested' | 'following';

export default function FeedContainer() {
  const [feedType, setFeedType] = useState<FeedType>('suggested');

  return (
    <div className="flex flex-col gap-4">
      <FeedTabs selected={feedType} onSelect={setFeedType} />
      <PostList type={feedType} />
    </div>
  );
}
