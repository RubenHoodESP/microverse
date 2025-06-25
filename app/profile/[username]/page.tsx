import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfileLayout from '@/features/user/components/ProfileLayout';
import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileContent from '@/features/user/components/ProfileContent';
import { getUserProfile, getUserPosts } from '@/lib/api/users';
import { Suspense } from 'react';
import LoadingProfile from '@/features/user/components/LoadingProfile';
import { User } from '@/types/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface ProfilePageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const { username } = await params;
    const user = await getUserProfile(username);

    return {
      title: `${user.name} | Microverse Profile`,
      description: user.bio || `View ${user.name}'s profile on Microverse`,
      openGraph: {
        title: `${user.name} | Microverse Profile`,
        description: user.bio || `View ${user.name}'s profile on Microverse`,
        images: [user.avatarUrl || '/default-avatar.png'],
      },
    };
  } catch (error) {
    return {
      title: 'Profile Not Found | Microverse',
      description: 'The requested profile could not be found.',
    };
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  try {
    const { username: rawUsername } = await params;
    const username = decodeURIComponent(rawUsername);

    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);

    // Logs de depuración para verificar que todo funciona
    console.log('🔍 Debug - Username de la URL:', username);
    console.log('🔍 Debug - Sesión completa:', session);
    console.log('🔍 Debug - Username de la sesión:', session?.user?.username);
    console.log('🔍 Debug - ¿Es el mismo usuario?:', session?.user?.username === username);

    const user = await getUserProfile(username);
    const posts = await getUserPosts(user.id);

    // Determinar si el usuario actual es el propietario del perfil
    const isOwner = session?.user?.username === username;

    console.log('🔍 Debug - isOwner:', isOwner);

    return (
      <ProfileLayout>
        <Suspense fallback={<LoadingProfile />}>
          <ProfileHeader user={user} isOwner={isOwner} />
          <ProfileContent user={user} posts={posts} isOwner={isOwner} />
        </Suspense>
      </ProfileLayout>
    );
  } catch (error) {
    console.error('❌ Error en ProfilePage:', error);
    notFound();
  }
}
