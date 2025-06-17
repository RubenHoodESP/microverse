import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

describe('PostCard', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post',
    createdAt: new Date().toISOString(),
    author: {
      id: '1',
      name: 'Test User',
      email: 'test@test.com',
      image: '/default-avatar.png',
      username: 'testuser',
    },
  };

  it('muestra el título y contenido', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
  });

  it('muestra la información del autor', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText(mockPost.author.name)).toBeInTheDocument();
    expect(screen.getByAltText(mockPost.author.name)).toBeInTheDocument();
  });
});
