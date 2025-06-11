import { User } from '@/types/user';
import ProfileTabs from './ProfileTabs';
import ProfileStats from './ProfileStats';

interface ProfileContentProps {
  user: User;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="px-6 py-4">
      {/* Stats Section */}
      <ProfileStats user={user} />

      {/* Tabs Section */}
      <div className="mt-6">
        <ProfileTabs user={user} />
      </div>
    </div>
  );
}
