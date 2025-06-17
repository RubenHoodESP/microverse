import { Post } from '@/entities/post/Post';

export class PostService {
  async createPost(content: string): Promise<Post> {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el post');
    }

    return response.json();
  }

  async getPosts(): Promise<Post[]> {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Error al obtener los posts');
    }
    return response.json();
  }
}