'use client';

import { Avatar } from '@/features/shared/components/Avatar';
import { Post } from '@/features/feed/services/feedApi';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-background border border-foreground rounded-lg shadow p-4">
      <div className="flex items-start gap-3">
        <Avatar src={post.author.image} name={post.author.name} size="md" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{post.author.name}</h3>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: es,
              })}
            </span>
          </div>
          <h2 className="text-xl font-bold mt-1">{post.title}</h2>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="flex items-center gap-4 mt-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <span>❤️</span>
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <span>💬</span>
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
