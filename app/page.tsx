"use client";
import { useGetPostsQuery } from "@/features/posts/services/postsApi";
import PostCard from "@/features/posts/components/PostCard";

export default function FeedPage() {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) return <p>Cargando posts...</p>;
  if (error) return <p>Error al cargar el feed.</p>;
  if (!posts?.length) return <p>No hay posts aún.</p>;

  return (
    <div>
      <h1>Feed público</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
