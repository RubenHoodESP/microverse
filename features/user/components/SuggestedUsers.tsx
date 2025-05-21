'use client';

import { useGetSuggestedUsersQuery } from '../services/userApi';

export default function SuggestedUsers() {
  const { data: users, isLoading, error } = useGetSuggestedUsersQuery();

  if (isLoading) return <p className="text-sm text-gray-500">Cargando sugerencias...</p>;
  if (error) return <p className="text-sm text-red-500">Error al cargar sugerencias.</p>;
  if (!users?.length) return null;

  return (
    <aside>
      <h2 className="text-lg font-semibold mb-3">A quién seguir</h2>
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
            <button className="text-sm px-3 py-1 rounded-full bg-black text-white hover:bg-gray-800 transition">
              Seguir
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
