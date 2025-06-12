import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 1. Constantes y tipos para mejor mantenibilidad
const ROUTES = {
  PUBLIC: new Set(['/login', '/register']),
  STATIC: new Set(['/_next', '/static', '/api', '/favicon.ico', '/public']),
  HOME: '/',
  LOGIN: '/login'
} as const;

// 2. Interfaces para mejor tipado
interface AuthResult {
  isAuthenticated: boolean;
  redirectUrl?: string;
}

// 3. Clase para manejar la lógica de autenticación
class AuthMiddleware {
  private static instance: AuthMiddleware;
  
  private constructor() {}

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  private async checkAuthentication(
    request: NextRequest, 
    pathname: string
  ): Promise<AuthResult> {
    const token = await getToken({ req: request });
    const isPublic = this.isPublicRoute(pathname);

    if (!token && !isPublic) {
      return { isAuthenticated: false, redirectUrl: ROUTES.LOGIN };
    }

    if (token && isPublic) {
      return { isAuthenticated: true, redirectUrl: ROUTES.HOME };
    }

    return { isAuthenticated: !!token };
  }

  public async handle(request: NextRequest): Promise<NextResponse> {
    try {
      // Verificación temprana de modo mock
      if (this.isMockMode()) {
        return NextResponse.next();
      }

      const pathname = request.nextUrl.pathname;
      
      // Verificación temprana de rutas estáticas
      if (this.isStaticRoute(pathname)) {
        return NextResponse.next();
      }

      const authResult = await this.checkAuthentication(request, pathname);
      
      if (authResult.redirectUrl) {
        return NextResponse.redirect(new URL(authResult.redirectUrl, request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  private isMockMode(): boolean {
    return process.env.MOCK_MODE === 'true';
  }

  private isStaticRoute(pathname: string): boolean {
    return Array.from(ROUTES.STATIC).some(route => pathname.startsWith(route));
  }

  private isPublicRoute(pathname: string): boolean {
    return Array.from(ROUTES.PUBLIC).some(route => pathname.startsWith(route));
  }
}

  // 4. Función principal del middleware
export async function middleware(request: NextRequest): Promise<NextResponse> {
  return AuthMiddleware.getInstance().handle(request);
}

// 5. Configuración optimizada del matcher
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|static).*)',
  ],
};