import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileContent from '@/components/profile/ProfileContent';
import { getUserProfile } from '@/lib/api/users';
import { Suspense } from 'react';
import LoadingProfile from '@/components/profile/LoadingProfile';

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
