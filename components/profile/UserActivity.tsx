import { User } from '@/types/user';

interface UserActivityProps {
  user: User;
}

export default function UserActivity({ user }: UserActivityProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Actividad Reciente</h3>
      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">No hay actividad reciente</p>
        </div>
      </div>
    </div>
  );
}
