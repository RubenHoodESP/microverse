import Image from 'next/image';
import { User } from '@/types/user';
import { MapPin, Link as LinkIcon, Github, Linkedin, Twitter } from 'lucide-react';
import { useGetCurrentUserQuery } from '@/store/services/userApi';
import { Button } from '@/shared/components/atoms/Button';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { data: currentUser } = useGetCurrentUserQuery();
  const isOwnProfile = currentUser?.id === user.id;

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
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
                {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button variant="outline">Editar Perfil</Button>
                ) : (
                  <>
                    <Button variant="outline">Seguir</Button>
                    <Button>Mensaje</Button>
                  </>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="mt-4 flex gap-3">
              {user.githubUrl && (
                <a
                  href={user.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {user.linkedinUrl && (
                <a
                  href={user.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {user.twitterUrl && (
                <a
                  href={user.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
