import { NextResponse } from 'next/server';
import { followUser } from '@/lib/api/users';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    console.log('👤 Intentando seguir usuario:', userId);
    await followUser(userId);
    console.log('✅ Usuario seguido exitosamente');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error al seguir usuario:', error);
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