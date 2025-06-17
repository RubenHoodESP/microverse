import { NextResponse } from 'next/server';
import { unfollowUser } from '@/lib/api/users';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    console.log('👤 Intentando dejar de seguir usuario:', userId);
    await unfollowUser(userId);
    console.log('✅ Usuario dejado de seguir exitosamente');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error al dejar de seguir usuario:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'No autorizado' ? 401 : 500 }
      );
    }
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 