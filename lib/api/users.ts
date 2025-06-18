import { prisma } from '@/lib/prisma';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export async function getUserProfile(username: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      followers: true,
      following: true,
    },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return user;
}

export async function getSuggestedUsers(): Promise<User[]> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('No autorizado');
  }

  // Obtener usuarios que el usuario actual no sigue
  const followingUsers = await prisma.follow.findMany({
    where: {
      followerId: session.user.id
    },
    select: {
      followingId: true
    }
  });

  const suggestedUsers = await prisma.user.findMany({
    where: {
      AND: [
        { id: { not: session.user.id } }, // Excluir al usuario actual
        {
          id: {
            notIn: followingUsers.map((f: { followingId: string }) => f.followingId) // Excluir usuarios que ya sigues
          }
        }
      ]
    },
    take: 5, // Limitar a 5 sugerencias
    orderBy: {
      followers: {
        _count: 'desc' // Ordenar por popularidad
      }
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      email: true,
      createdAt: true,
      _count: {
        select: {
          followers: true,
          following: true
        }
      }
    }
  });

  // Transformar los datos para incluir el conteo de seguidores
  return suggestedUsers.map((user: any) => ({
    ...user,
    followersCount: user._count.followers,
    followingCount: user._count.following,
    _count: undefined
  }));
}

export async function followUser(userId: string): Promise<void> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('No autorizado');
  }

  // Verificar que ambos usuarios existen
  const [currentUser, userToFollow] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id }
    }),
    prisma.user.findUnique({
      where: { id: userId }
    })
  ]);

  if (!currentUser || !userToFollow) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar si ya existe la relación
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: userId
      }
    }
  });

  if (existingFollow) {
    return;
  }

  // Crear la relación de seguimiento usando la tabla Follow
  await prisma.follow.create({
    data: {
      followerId: session.user.id,
      followingId: userId
    }
  });
}

export async function unfollowUser(userId: string): Promise<void> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('No autorizado');
  }

  console.log('🔍 Verificando usuarios...');
  // Verificar que ambos usuarios existen
  const [currentUser, userToUnfollow] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id }
    }),
    prisma.user.findUnique({
      where: { id: userId }
    })
  ]);

  if (!currentUser || !userToUnfollow) {
    throw new Error('Usuario no encontrado');
  }

  console.log('✅ Usuarios encontrados, eliminando relación...');
  // Eliminar la relación de seguimiento
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      following: {
        disconnect: {
          id: userId
        }
      }
    }
  });

  console.log('✅ Relación eliminada exitosamente');
} 