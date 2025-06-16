import { NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';
import { z } from 'zod';

// Esquema de validación
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar los datos de entrada
    const validatedData = loginSchema.parse(body);
    
    // Intentar el login
    const { user, token } = await loginUser(
      validatedData.email,
      validatedData.password
    );

    // Crear la respuesta con el token en una cookie HTTP-only
    const response = NextResponse.json(
      { 
        user,
        message: "Login exitoso"
      },
      { status: 200 }
    );

    // Configurar la cookie con el token
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al iniciar sesión" },
      { status: 401 }
    );
  }
} 