import { User } from '@/types/user';

interface UserProjectsProps {
  user: User;
}

export default function UserProjects({ user }: UserProjectsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Proyectos</h3>
      {user.projects && user.projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium">{project.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay proyectos disponibles</p>
      )}
    </div>
  );
}
