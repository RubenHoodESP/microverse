import Image from 'next/image';

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio?: string;
}

interface ProfileHeaderProps {
  user: User;
  isOwner?: boolean;
}

export default function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative w-20 h-20">
        <Image
          src={user.avatar || '/default-avatar.png'}
          alt={user.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500">@{user.username}</p>
        {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        {isOwner && (
          <button className="mt-2 px-4 py-1 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
            Editar perfil
          </button>
        )}
      </div>
    </div>
  );
}
