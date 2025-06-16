import { User, CreateUserDTO, UpdateUserDTO } from '../../domain/entities/User';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  create(userData: CreateUserDTO): Promise<User>;
  update(id: string, userData: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
} 