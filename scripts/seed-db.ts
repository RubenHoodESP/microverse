import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Crear usuarios de prueba
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        email: 'ruben@ejemplo.com',
        username: 'Rubén',
        name: 'Rubén García',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?img=1',
        bio: 'Desarrollador Full Stack apasionado por la tecnología'
      },
      {
        email: 'maria@ejemplo.com',
        username: 'maria',
        name: 'María López',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?img=2',
        bio: 'Diseñadora UX/UI creativa'
      },
      {
        email: 'carlos@ejemplo.com',
        username: 'carlos',
        name: 'Carlos Rodríguez',
        password: hashedPassword,
        image: 'https://i.pravatar.cc/150?img=3',
        bio: 'Ingeniero de software especializado en React'
      }
    ];

    console.log('👥 Creando usuarios...');
    
    for (const userData of users) {
      const existingUser = await prisma.user.findUnique({
        where: { username: userData.username }
      });

      if (!existingUser) {
        const user = await prisma.user.create({
          data: userData
        });
        console.log(`✅ Usuario creado: ${user.username}`);
      } else {
        console.log(`⚠️ Usuario ya existe: ${userData.username}`);
      }
    }

    // Crear algunos posts de prueba
    console.log('📝 Creando posts...');
    
    const rubenUser = await prisma.user.findUnique({
      where: { username: 'Rubén' }
    });

    if (rubenUser) {
      const posts = [
        {
          title: 'Mi primer post en Microverse',
          content: '¡Hola a todos! Este es mi primer post en esta increíble plataforma.',
          authorId: rubenUser.id
        },
        {
          title: 'Aprendiendo Next.js 15',
          content: 'Next.js 15 trae muchas mejoras interesantes. Los parámetros dinámicos ahora son promesas.',
          authorId: rubenUser.id
        }
      ];

      for (const postData of posts) {
        const post = await prisma.post.create({
          data: postData
        });
        console.log(`✅ Post creado: ${post.title}`);
      }
    }

    console.log('🎉 Seed completado exitosamente!');
    
    // Mostrar usuarios creados
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    console.log('📋 Usuarios en la base de datos:', allUsers);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase(); 