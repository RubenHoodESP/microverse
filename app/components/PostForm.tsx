'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface PostFormProps {
  onPostCreated: (post: any) => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error('Error al crear el post');

      const newPost = await response.json();
      onPostCreated(newPost);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-4">
        <img
          src={session?.user?.image || '/default-avatar.png'}
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué está pasando?"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            maxLength={280}
          />
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">{content.length}/280</span>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className={`px-4 py-2 rounded-full font-semibold ${
                !content.trim() || isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
