import { Post } from '@/entities/post/Post';
import { User } from '@/types/user';


interface ProfileContentProps {
  user: User;
  posts: Post[];
  isOwner?: boolean;
}

export default function ProfileContent({ user, posts, isOwner }: ProfileContentProps) {
  return (
    <div>
      {isOwner && (
        <div className="mb-4">
          <button className="px-4 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700 transition">
            Editar biografía
          </button>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-3">Publicaciones</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">Este usuario no ha publicado nada aún.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id} className="border rounded p-4">
              <h3 className="font-bold text-lg mb-1">{post.title}</h3>
              <p>{post.content}</p>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
