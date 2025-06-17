'use client';

import { memo, useEffect } from 'react';
import { useGetPostsQuery } from '../services/feedApi';
import { FeedType } from './FeedContainer';
import PostCard from '@/features/posts/components/PostCard';

const POLLING_INTERVAL = 30000; // 30 segundos

const PostList = memo(function PostList({ type }: { type: FeedType }) {
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(type, {
    pollingInterval: POLLING_INTERVAL,
    refetchOnMountOrArgChange: true,
  });

  // Efecto para manejar el polling cuando el componente está visible
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error al cargar las publicaciones</div>;
  }

  if (!posts?.length) {
    return (
      <div className="text-center text-gray-500">
        {type === 'following'
          ? 'No sigues a nadie aún. ¡Prueba a seguir a gente!'
          : 'No hay publicaciones aún'}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
});

export default PostList;
