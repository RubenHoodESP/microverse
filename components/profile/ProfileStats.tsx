import { User } from '@/types/user';

interface ProfileStatsProps {
  user: User;
}

export default function ProfileStats({ user }: ProfileStatsProps) {
  const stats = [
    { label: 'Proyectos', value: user.projects?.length || 0 },
    { label: 'Seguidores', value: user.followers?.length || 0 },
    { label: 'Siguiendo', value: user.following?.length || 0 },
    { label: 'Contribuciones', value: user.contributions || 0 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center">
          <dt className="text-sm font-medium text-gray-500">{stat.label}</dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</dd>
        </div>
      ))}
    </div>
  );
}
