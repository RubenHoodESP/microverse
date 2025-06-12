'use client';

import { useState } from 'react';
import { useCreatePostMutation } from '@/store/services/feedApi';
import { useDispatch } from 'react-redux';
import { addPost } from '@/store/slices/postsSlice';
import { Post } from '@/entities/post/Post';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [createPost] = useCreatePostMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    try {
      if (process.env.MOCK_MODE === 'true') {
        // Crear un post mock
        const mockPost: Post = {
          id: String(Date.now()),
          title: postContent.slice(0, 50) + (postContent.length > 50 ? '...' : ''),
          content: postContent,
          createdAt: new Date().toISOString(),
          author: {
            id: '1', // ID del usuario mock
            name: 'Usuario Mock',
            username: 'mockuser',
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
          },
          likes:[],
          comments: [],
        };

        // Añadir el post al estado
        dispatch(addPost(mockPost));
        setPostContent('');
      } else {
        // Llamada real a la API
        await createPost({ content: postContent }).unwrap();
        setPostContent('');
      }
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-200 pb-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="¿Qué está pasando?"
            className="w-full p-4 text-lg resize-none focus:outline-none bg-transparent"
            rows={3}
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!postContent.trim()}
          className="bg-[--foreground] text-[--background] px-4 py-2 rounded-full font-medium disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
