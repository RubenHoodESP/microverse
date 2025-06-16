import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";
import { z } from "zod";

// Esquema de validación
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  username: z.string().min(3, "El username debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validar los datos de entrada
    const validatedData = registerSchema.parse(body);
    
    // Registrar el usuario usando la función de lib/auth.ts
    const { user, token } = await registerUser(
      validatedData.email,
      validatedData.username,
      validatedData.password,
      validatedData.name
    );

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          image: user.image
        },
        token 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error al registrar usuario" },
      { status: 400 }
    );
  }
} 