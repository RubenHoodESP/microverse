'use client';

import { useState } from 'react';
import { useCreatePostMutation } from '@/shared/store/services/feedApi';
import { useDispatch } from 'react-redux';
import { addPost } from '@/shared/store/slices/postsSlice';
import { Post } from '@/entities/post/Post';
import { useSession } from 'next-auth/react';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [createPost] = useCreatePostMutation();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim() || !session?.user) return;

    try {
      const response = await createPost({ content: postContent }).unwrap();

      // Añadir el post al estado global
      dispatch(addPost(response));

      // Limpiar el formulario
      setPostContent('');
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
            className="w-full p-4 text-lg resize-none focus:outline-none bg-transparent placeholder:text-gray-500"
            rows={3}
          />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!postContent.trim() || !session?.user}
          className="bg-[--foreground] text-[--background] px-4 py-2 rounded-full font-medium disabled:opacity-50"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
