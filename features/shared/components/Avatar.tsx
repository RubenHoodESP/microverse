'use client';

import Image from 'next/image';
import { DefaultAvatar } from './DefaultAvatar';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, name, size = 'md', className = '' }: AvatarProps) => {
  if (!src) {
    return <DefaultAvatar name={name} size={size} className={className} />;
  }

  const sizePx = {
    sm: 32,
    md: 40,
    lg: 48,
  }[size];

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src={src}
        alt={name}
        width={sizePx}
        height={sizePx}
        className="rounded-full object-cover"
      />
    </div>
  );
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};
