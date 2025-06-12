import { User } from "@/types/user";

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt?: string;
  author?: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
  };
  likes: User[];
  comments: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
};
