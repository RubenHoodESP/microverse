'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, User, Settings } from 'lucide-react';
import { useTheme } from '@/shared/theme/useTheme';
import { useGetCurrentUserQuery } from '@/store/services/userApi';

type NavItem = {
  href?: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: currentUser } = useGetCurrentUserQuery();

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Inicio',
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: '/explore',
      label: 'Explorar',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      href: currentUser ? `/profile/${currentUser.username}` : '/login',
      label: 'Perfil',
      icon: <User className="w-5 h-5" />,
    },
    {
      label: `Tema: ${theme === 'dark' ? 'Oscuro' : 'Claro'}`,
      icon: <Settings className="w-5 h-5" />,
      onClick: () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      },
    },
  ];

  return (
    <nav className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold px-2 mb-4">Microverse</h1>

      <ul className="flex flex-col gap-2">
        {navItems.map(({ href, label, icon, onClick }) => {
          const isActive = pathname === href;

          return (
            <li key={label}>
              {href ? (
                <Link href={href} className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
                  {icon}
                  <span className="text-base">{label}</span>
                </Link>
              ) : (
                <button onClick={onClick} className="nav-link">
                  {icon}
                  <span className="text-base">{label}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
