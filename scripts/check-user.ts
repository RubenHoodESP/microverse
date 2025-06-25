import { prisma } from '../lib/prisma';

async function checkUser() {
  try {
    console.log('🔍 Buscando usuario "Rubén"...');
    
    const user = await prisma.user.findUnique({
      where: { username: 'Rubén' },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    if (user) {
      console.log('✅ Usuario encontrado:', user);
    } else {
      console.log('❌ Usuario "Rubén" no encontrado');
      
      // Listar todos los usuarios para ver qué hay
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
        }
      });
      
      console.log('📋 Usuarios disponibles:', allUsers);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 