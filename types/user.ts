export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  projects?: Project[];
  followers?: User[];
  following?: User[];
  contributions?: number;
  skills?: Skill[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  technologies: string[];
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
} 