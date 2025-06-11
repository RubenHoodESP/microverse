import { Metadata } from 'next';
import ProfileLayout from '@/components/profile/ProfileLayout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileContent from '@/components/profile/ProfileContent';
import { getUserProfile } from '@/lib/api/users';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const user = await getUserProfile(params.username);

  return {
    title: `${user.name} | Microverse Profile`,
    description: `View ${user.name}'s profile on Microverse`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await getUserProfile(params.username);

  return (
    <ProfileLayout>
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </ProfileLayout>
  );
}
