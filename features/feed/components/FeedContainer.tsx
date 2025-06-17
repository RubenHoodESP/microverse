'use client';

import { useState, Suspense, lazy, memo } from 'react';

export type FeedType = 'suggested' | 'following';

// Lazy load components
const FeedTabs = lazy(() => import('./FeedTabs'));
const PostList = lazy(() => import('./PostList'));
const CreatePost = lazy(() => import('./createPost'));

// Loading components
const TabsLoading = () => <div className="animate-pulse bg-gray-200 h-10 rounded-lg mb-4"></div>;

const PostFormLoading = () => (
  <div className="animate-pulse bg-gray-200 h-40 rounded-lg mb-4"></div>
);

const PostListLoading = () => (
  <div className="flex flex-col gap-4">
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
    <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
  </div>
);

const FeedContainer = memo(function FeedContainer() {
  const [feedType, setFeedType] = useState<FeedType>('suggested');

  return (
    <div className="flex flex-col gap-4">
      <Suspense fallback={<TabsLoading />}>
        <FeedTabs selected={feedType} onSelect={setFeedType} />
      </Suspense>

      <Suspense fallback={<PostFormLoading />}>
        <CreatePost />
      </Suspense>

      <Suspense fallback={<PostListLoading />}>
        <PostList type={feedType} />
      </Suspense>
    </div>
  );
});

export default FeedContainer;
