import { AuthPort } from '../../ports/auth/AuthPort';
import { User, UserCredentials, CreateUserDTO } from '../../domain/entities/User';
import { hash, compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export class AuthService implements AuthPort {
  constructor(
    private readonly userRepository: any, // TODO: Definir UserRepository interface
    private readonly secret: string
  ) {}

  async login(credentials: UserCredentials): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isValid = await compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  async register(userData: CreateUserDTO): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await hash(userData.password, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    return { user, token };
  }

  async logout(): Promise<void> {
    // Implementación específica según necesidades
  }

  async getCurrentUser(): Promise<User | null> {
    // Implementación específica según necesidades
    return null;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      verify(token, this.secret);
      return true;
    } catch {
      return false;
    }
  }

  private generateToken(user: User): string {
    return sign(
      { 
        id: user.id,
        email: user.email,
        username: user.username
      },
      this.secret,
      { expiresIn: '7d' }
    );
  }
} 