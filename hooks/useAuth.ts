import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      
      // Mock mode
      if (process.env.MOCK_MODE === 'true') {
        router.push("/");
        router.refresh();
        return true;
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas");
        return false;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al iniciar sesión");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setError(null);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al registrar usuario");
      }

      // Iniciar sesión automáticamente después del registro
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Error al iniciar sesión después del registro");
        return false;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error en registro:", error);
      setError(error instanceof Error ? error.message : "Error al registrar usuario");
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error en logout:", error);
      setError("Error al cerrar sesión");
    }
  };

  return {
    session,
    status,
    error,
    login,
    register,
    logout,
  };
} 