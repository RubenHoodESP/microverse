export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string; // URL del avatar
  bio?: string;
  location?: string;
  website?: string;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
  // Puedes añadir más campos según crezca la app
}
