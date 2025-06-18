'use client';

import { useGetSuggestedUsersQuery, useFollowUserMutation } from '@/shared/store/services/userApi';
import Image from 'next/image';
import { useEffect } from 'react';

export default function SuggestedUsers() {
  const {
    data: users,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useGetSuggestedUsersQuery(undefined, {
    // Forzar la petición cada vez que el componente se monte
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log('Estado de SuggestedUsers:', {
      isLoading,
      isError,
      isSuccess,
      error,
      usersCount: users?.length,
      users,
    });
  }, [isLoading, isError, isSuccess, error, users]);

  const [followUser] = useFollowUserMutation();

  const handleFollow = async (userId: string) => {
    try {
      console.log('Intentando seguir usuario:', userId);
      await followUser(userId).unwrap();
      console.log('Usuario seguido exitosamente:', userId);
    } catch (error) {
      console.error('Error al seguir usuario:', error);
    }
  };

  if (isLoading) {
    console.log('Renderizando estado de carga...');
    return (
      <aside>
        <h2 className="text-lg font-semibold mb-3">A quién seguir</h2>
        <p className="text-sm text-gray-500">Cargando sugerencias...</p>
      </aside>
    );
  }

  if (isError) {
    console.error('Error en SuggestedUsers:', error);
    return (
      <aside>
        <h2 className="text-lg font-semibold mb-3">A quién seguir</h2>
        <p className="text-sm text-red-500">Error al cargar sugerencias: {JSON.stringify(error)}</p>
      </aside>
    );
  }

  if (!users?.length) {
    console.log('No hay usuarios sugeridos');
    return (
      <aside>
        <h2 className="text-lg font-semibold mb-3">A quién seguir</h2>
        <p className="text-sm text-gray-500">No hay usuarios sugeridos</p>
      </aside>
    );
  }

  console.log('Renderizando lista de usuarios sugeridos:', users);

  return (
    <aside>
      <h2 className="text-lg font-semibold mb-3">A quién seguir</h2>
      <ul className="flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className="text-sm px-3 py-1 rounded-full bg-black text-white hover:bg-gray-800 transition"
            >
              Seguir
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
