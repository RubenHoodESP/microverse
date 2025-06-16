import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../../core/ports/repositories/UserRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '../../core/domain/entities/User';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapToDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.mapToDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return user ? this.mapToDomain(user) : null;
  }

  async create(userData: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({
      data: userData,
    });
    return this.mapToDomain(user);
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: userData,
    });
    return this.mapToDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaUser: any): User {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.username,
      name: prismaUser.name,
      image: prismaUser.image,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }
} 