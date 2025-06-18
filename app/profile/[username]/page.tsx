import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfileLayout from '@/features/user/components/ProfileLayout';
import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileContent from '@/features/user/components/ProfileContent';
import { getUserProfile } from '@/lib/api/users';
import { Suspense } from 'react';
import LoadingProfile from '@/features/user/components/LoadingProfile';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const user = await getUserProfile(params.username);

    return {
      title: `${user.name} | Microverse Profile`,
      description: user.bio || `View ${user.name}'s profile on Microverse`,
      openGraph: {
        title: `${user.name} | Microverse Profile`,
        description: user.bio || `View ${user.name}'s profile on Microverse`,
        images: [user.avatar || '/default-avatar.png'],
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
    const user = await getUserProfile(params.username);

    return (
      <ProfileLayout>
        <Suspense fallback={<LoadingProfile />}>
          <ProfileHeader user={user} />
          <ProfileContent user={user} />
        </Suspense>
      </ProfileLayout>
    );
  } catch (error) {
    notFound();
  }
}
