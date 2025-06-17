'use client';

import { useMemo } from 'react';

interface DefaultAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

const colors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
];

export const DefaultAvatar = ({ name, size = 'md', className = '' }: DefaultAvatarProps) => {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const colorIndex = useMemo(() => {
    return name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  }, [name]);

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colors[colorIndex]}
        rounded-full
        flex
        items-center
        justify-center
        text-white
        font-medium
        ${className}
      `}
    >
      {initials}
    </div>
  );
};
