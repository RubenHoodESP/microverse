// Mock del componente Avatar
jest.mock('@/shared/components/Avatar', () => ({
  __esModule: true,
  default: ({ src, name, size }: { src: string; name: string; size: string }) => (
    <img src={src} alt={`${name}'s avatar`} className={`avatar-${size}`} />
  ),
}));
