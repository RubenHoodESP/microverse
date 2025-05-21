import { useGetPostsQuery } from '../services/feedApi';
import PostCard from '@/features/posts/components/PostCard';
import PostSkeleton from '@/features/posts/components/PostSkeleton';
import { FeedType } from './FeedContainer';

type PostListProps = {
  type: FeedType;
};

export default function PostList({ type }: PostListProps) {
  const { data: posts, isLoading, error } = useGetPostsQuery({ type });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error al cargar los posts.</p>;
  if (!posts?.length) return <p>No hay publicaciones aún.</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
