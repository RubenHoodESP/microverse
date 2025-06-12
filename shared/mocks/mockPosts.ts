import { Post } from '@/entities/post/Post';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: '¡Bienvenido a Microverse!',
    content: 'Microverse es una plataforma donde puedes compartir tus ideas y conectar con otros desarrolladores. ¡Únete a nuestra comunidad!',
    createdAt: new Date().toISOString(),
    author: {
      id: '1',
      name: 'Ana García',
      username: 'anagarcia',
      avatarUrl: 'https://i.pravatar.cc/150?img=1'
    }
  },
  {
    id: '2',
    title: 'Tips para mejorar tu código',
    content: 'Aquí hay algunos consejos que he aprendido durante mi carrera como desarrollador: 1. Escribe código limpio y legible 2. Documenta tu código 3. Haz pruebas unitarias 4. Usa control de versiones',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
    author: {
      id: '2',
      name: 'Carlos Ruiz',
      username: 'carlosdev',
      avatarUrl: 'https://i.pravatar.cc/150?img=2'
    }
  },
  {
    id: '3',
    title: 'Mi experiencia con Next.js 14',
    content: 'Next.js 14 ha traído mejoras increíbles en rendimiento y experiencia de desarrollo. El nuevo sistema de rutas y el soporte mejorado para Server Components son características que realmente marcan la diferencia.',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
    author: {
      id: '3',
      name: 'Laura Martínez',
      username: 'lauratech',
      avatarUrl: 'https://i.pravatar.cc/150?img=3'
    }
  },
  {
    id: '4',
    title: '¿Cómo manejar el estado en React?',
    content: 'Hay varias formas de manejar el estado en React: Context API, Redux, Zustand, Jotai... Cada uno tiene sus ventajas. En este post analizaremos cuándo usar cada uno.',
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 horas atrás
    author: {
      id: '4',
      name: 'Miguel Torres',
      username: 'migueldev',
      avatarUrl: 'https://i.pravatar.cc/150?img=4'
    }
  },
  {
    id: '5',
    title: 'Tendencias en desarrollo web 2024',
    content: 'Las tendencias más importantes en desarrollo web para 2024 incluyen: 1. Server Components 2. Edge Computing 3. WebAssembly 4. Micro-frontends 5. AI/ML en el frontend',
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 horas atrás
    author: {
      id: '5',
      name: 'Sofía López',
      username: 'sofialopez',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    }
  }
];