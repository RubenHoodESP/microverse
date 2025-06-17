import { NextResponse } from 'next/server';
import { getSuggestedUsers } from '@/lib/api/users';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  console.log('📥 Recibida petición GET /api/users/suggested');
  
  try {
    // Verificar la sesión
    const session = await getServerSession(authOptions);
    console.log('🔐 Estado de la sesión:', session ? 'Autenticado' : 'No autenticado');
    
    if (!session?.user?.id) {
      console.log('❌ No hay sesión de usuario');
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    console.log('🔍 Buscando usuarios sugeridos...');
    const users = await getSuggestedUsers();
    console.log('✅ Usuarios sugeridos encontrados:', users.length);
    console.log('📋 Datos de usuarios:', users);
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('❌ Error en /api/users/suggested:', error);
    
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