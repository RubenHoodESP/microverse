import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function registerUser(email: string, username: string, password: string, name?: string) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      throw new Error('El usuario o email ya existe');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name
      }
    });

    // Generar token JWT
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'tu-secreto-seguro',
      { expiresIn: '7d' }
    );

    return { user, token };
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        password: true,
        image: true
      }
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token JWT
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'tu-secreto-seguro',
      { expiresIn: '7d' }
    );

    // Retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
} 