import { Post } from '@/entities/post/Post';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-background border border-foreground rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div>
            <p className="font-semibold">Nombre del usuario</p>
            <p className="text-sm text-gray-500">@usuario</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">Hace 1h</span>
      </header>

      <h2 className="text-lg font-medium mb-1">{post.title}</h2>
      <p className="text-gray-700">{post.content}</p>
    </article>
  );
}
