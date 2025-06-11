import Image from 'next/image';
import { User } from '@/types/user';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative">
      {/* Banner Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg" />

      {/* Profile Section */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden bg-white">
            <Image
              src={user.avatarUrl || '/default-avatar.png'}
              alt={`${user.name}'s profile picture`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
            {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
