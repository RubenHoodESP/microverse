import { User, UserCredentials, CreateUserDTO } from '../../domain/entities/User';

export interface AuthPort {
  login(credentials: UserCredentials): Promise<{ user: User; token: string }>;
  register(userData: CreateUserDTO): Promise<{ user: User; token: string }>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  validateToken(token: string): Promise<boolean>;
} 