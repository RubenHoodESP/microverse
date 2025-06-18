import { ReactNode } from 'react';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return <section className="max-w-2xl mx-auto py-8 px-4">{children}</section>;
}
