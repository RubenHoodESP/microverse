import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/types/user';


export async function getUserProfile(username: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      followers: {
        include: {
          following: true,
        },
      },
      following: {
        include: {
          follower: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Transformar los datos de Prisma al tipo User personalizado
  return {
    id: user.id,
    username: user.username,
    name: user.name || user.username, // Usar username como fallback si name es null
    email: user.email,
    avatarUrl: user.image || undefined,
    bio: user.bio || undefined,
    location: undefined, // No existe en el schema actual
    website: undefined, // No existe en el schema actual
    githubUrl: undefined, // No existe en el schema actual
    linkedinUrl: undefined, // No existe en el schema actual
    twitterUrl: undefined, // No existe en el schema actual
    projects: [], // No existe en el schema actual
    followers: user.followers.map(follow => ({
      id: follow.following.id,
      username: follow.following.username,
      name: follow.following.name || follow.following.username,
      email: follow.following.email,
      avatarUrl: follow.following.image || undefined,
      bio: follow.following.bio || undefined,
      location: undefined,
      website: undefined,
      githubUrl: undefined,
      linkedinUrl: undefined,
      twitterUrl: undefined,
      projects: [],
      followers: [],
      following: [],
      contributions: 0,
      skills: [],
      createdAt: follow.following.createdAt.toISOString(),
      updatedAt: follow.following.updatedAt.toISOString(),
    })),
    following: user.following.map(follow => ({
      id: follow.follower.id,
      username: follow.follower.username,
      name: follow.follower.name || follow.follower.username,
      email: follow.follower.email,
      avatarUrl: follow.follower.image || undefined,
      bio: follow.follower.bio || undefined,
      location: undefined,
      website: undefined,
      githubUrl: undefined,
      linkedinUrl: undefined,
      twitterUrl: undefined,
      projects: [],
      followers: [],
      following: [],
      contributions: 0,
      skills: [],
      createdAt: follow.follower.createdAt.toISOString(),
      updatedAt: follow.follower.updatedAt.toISOString(),
    })),
    contributions: 0, // No existe en el schema actual
    skills: [], // No existe en el schema actual
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
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

export async function getUserPosts(userId: string) {
  const posts = await prisma.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        }
      }
    }
  });

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    author: {
      id: post.author.id,
      username: post.author.username,
      name: post.author.name || post.author.username,
      avatarUrl: post.author.image || undefined,
    },
    likes: [], // Array vacío por ahora
    comments: [], // Array vacío por ahora
  }));
} 