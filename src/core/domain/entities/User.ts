export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
  name?: string;
}

export interface UpdateUserDTO {
  email?: string;
  username?: string;
  name?: string;
  image?: string;
} 