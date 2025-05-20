type LoginFormProps = {
  username: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
};

export default function LoginForm({
  username,
  password,
  onChange,
  onSubmit,
  loading,
  error,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input name="username" value={username} onChange={onChange} placeholder="Usuario" />
      <input
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Contraseña"
        type="password"
      />
      <button type="submit" disabled={loading}>
        Iniciar sesión
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
