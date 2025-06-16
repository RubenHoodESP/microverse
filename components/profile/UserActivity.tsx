import { User } from '@/types/user';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { GitCommit, MessageSquare, ThumbsUp, Star, Code } from 'lucide-react';

interface UserActivityProps {
  user: User;
}

type ActivityType = 'commit' | 'comment' | 'like' | 'star' | 'project';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  link?: string;
}

export default function UserActivity({ user }: UserActivityProps) {
  // TODO: Implementar la obtención real de actividades
  const activities: Activity[] = [
    {
      id: '1',
      type: 'commit',
      title: 'Actualización del diseño del perfil',
      description: 'Mejoras en la UI/UX del perfil de usuario',
      timestamp: new Date().toISOString(),
      link: '#',
    },
    {
      id: '2',
      type: 'comment',
      title: 'Comentó en "Mejoras de rendimiento"',
      description: 'Excelente trabajo en la optimización',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      link: '#',
    },
    {
      id: '3',
      type: 'like',
      title: 'Dio like a "Nuevas características"',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      link: '#',
    },
  ];

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="w-5 h-5" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5" />;
      case 'like':
        return <ThumbsUp className="w-5 h-5" />;
      case 'star':
        return <Star className="w-5 h-5" />;
      case 'project':
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Actividad Reciente</h3>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 rounded-full">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  {activity.description && (
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDistanceToNow(new Date(activity.timestamp), {
                      addSuffix: true,
                      locale: es,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border rounded-lg p-4">
            <p className="text-gray-500">No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  );
}
