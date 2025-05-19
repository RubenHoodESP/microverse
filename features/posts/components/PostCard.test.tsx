import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

test('muestra el título y contenido', () => {
  render(<PostCard post={{ id: '1', title: 'Hola', content: 'Contenido de prueba' }} />);
  expect(screen.getByText('Hola')).toBeInTheDocument();
  expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
});
