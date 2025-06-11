'use client';

import { useState } from 'react';
import { User } from '@/types/user';
import UserProjects from './UserProjects';
import UserActivity from './UserActivity';
import UserSkills from './UserSkills';

interface ProfileTabsProps {
  user: User;
}

type Tab = 'projects' | 'activity' | 'skills';

export default function ProfileTabs({ user }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const tabs = [
    { id: 'projects', label: 'Proyectos' },
    { id: 'activity', label: 'Actividad' },
    { id: 'skills', label: 'Habilidades' },
  ] as const;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'projects' && <UserProjects user={user} />}
        {activeTab === 'activity' && <UserActivity user={user} />}
        {activeTab === 'skills' && <UserSkills user={user} />}
      </div>
    </div>
  );
}
