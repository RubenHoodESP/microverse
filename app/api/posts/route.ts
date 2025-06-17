import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';

// Inicializamos PrismaClient fuera de la función para reutilizar la conexión
const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'suggested';

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    let posts;
    if (type === 'following') {
      try {
        // Primero obtenemos los IDs de los usuarios que seguimos
        const following = await prisma.follow.findMany({
          where: {
            followerId: session.user.id
          },
          select: {
            followingId: true
          }
        });

        const followingIds = following.map(f => f.followingId);

        // Si no seguimos a nadie, devolvemos un array vacío
        if (followingIds.length === 0) {
          return NextResponse.json([]);
        }

        // Obtenemos los posts de los usuarios que seguimos
        posts = await prisma.post.findMany({
          where: {
            authorId: {
              in: followingIds
            }
          },
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true,
              },
            },
            likes: true,
            comments: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      } catch (error) {
        console.error('Error al obtener usuarios seguidos:', error);
        return NextResponse.json(
          { error: 'Error al obtener los usuarios seguidos' },
          { status: 500 }
        );
      }
    } else {
      // Obtener todos los posts (feed "Para ti")
      posts = await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          likes: true,
          comments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    // Transformar los datos para que coincidan con la interfaz Post
    const transformedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      likes: post.likes.length,
      comments: post.comments.length,
      author: post.author,
    }));

    return NextResponse.json(transformedPosts);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { content } = await request.json();
    const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: session.user.id
          }
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        likes: true,
        comments: true,
      },
    });

    // Transformar el post para que coincida con la interfaz Post
    const transformedPost = {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      likes: post.likes.length,
      comments: post.comments.length,
      author: post.author,
    };

    return NextResponse.json(transformedPost);
  } catch (error) {
    console.error('Error al crear post:', error);
    return NextResponse.json(
      { error: 'Error al crear el post' },
      { status: 500 }
    );
  }
}