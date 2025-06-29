import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que no requieren autenticación
const publicRoutes = [
  '/login',
  '/register',
  '/api/auth',
  '/_next',
  '/favicon.ico',
  '/public',
  '/profile'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('🔒 Middleware - Ruta accedida:', pathname);

  // Obtener el token de sesión de NextAuth
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  console.log('🔑 Middleware - NextAuth session token presente:', !!sessionToken);

  // Si el usuario está autenticado y trata de acceder a login/register
  if (sessionToken && (pathname === '/login' || pathname === '/register')) {
    console.log('🔄 Middleware - Usuario autenticado intentando acceder a login/register, redirigiendo a /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Si el usuario no está autenticado y la ruta no es pública
  if (!sessionToken && !publicRoutes.some(route => pathname.startsWith(route))) {
    console.log('🔒 Middleware - Usuario no autenticado intentando acceder a ruta protegida:', pathname);
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    console.log('🔄 Middleware - Redirigiendo a login con callbackUrl:', url.toString());
    return NextResponse.redirect(url);
  }

  console.log('✅ Middleware - Acceso permitido a:', pathname);
  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};