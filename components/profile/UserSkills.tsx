import { User } from '@/types/user';

interface UserSkillsProps {
  user: User;
}

export default function UserSkills({ user }: UserSkillsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Habilidades</h3>
      {user.skills && user.skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.skills.map((skill) => (
            <div key={skill.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{skill.name}</h4>
                <span className="text-sm text-gray-500">{skill.level}</span>
              </div>
              {skill.yearsOfExperience && (
                <p className="text-sm text-gray-600 mt-1">
                  {skill.yearsOfExperience} años de experiencia
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay habilidades registradas</p>
      )}
    </div>
  );
}
