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
};
