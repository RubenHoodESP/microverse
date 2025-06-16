import { User } from '@/types/user';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';
import Image from 'next/image';

interface UserProjectsProps {
  user: User;
}

export default function UserProjects({ user }: UserProjectsProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Proyectos</h3>
        {user.projects && user.projects.length > 0 && (
          <span className="text-sm text-gray-500">
            {user.projects.length} {user.projects.length === 1 ? 'proyecto' : 'proyectos'}
          </span>
        )}
      </div>

      {user.projects && user.projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              {project.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                </div>
              )}

              {/* Project Content */}
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-lg">{project.title}</h4>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-2">{project.description}</p>

                {/* Technologies */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  {project.stars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks && (
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{project.forks}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <p className="text-gray-500">No hay proyectos disponibles</p>
          <p className="text-sm text-gray-400 mt-2">
            {user.id === 'current-user'
              ? '¡Comienza a crear tus proyectos!'
              : 'Este usuario aún no tiene proyectos'}
          </p>
        </div>
      )}
    </div>
  );
}
