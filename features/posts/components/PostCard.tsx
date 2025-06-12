import { Post } from '@/entities/post/Post';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-background border border-foreground rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {post.author?.avatarUrl ? (
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}
          <div>
            <p className="font-semibold">{post.author?.name || 'Usuario Anónimo'}</p>
            <p className="text-sm text-foreground-secondary">
              @{post.author?.username || 'anonimo'}
            </p>
          </div>
        </div>
        {post.createdAt && (
          <span className="text-xs text-foreground-secondary">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: es,
            })}
          </span>
        )}
      </header>

      <h2 className="text-lg font-medium mb-1">{post.title}</h2>
      <p className="text-foreground-secondary">{post.content}</p>
    </article>
  );
}
