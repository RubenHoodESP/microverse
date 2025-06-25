import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

// Extender el tipo de sesión para incluir el id y username
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string;
    } & DefaultSession["user"]
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Credenciales inválidas');
        }

        console.log('🔑 [authorize] Usuario encontrado:', user);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username,
          image: user.image
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('🟡 [jwt] token antes:', token);
      if (user && typeof user === 'object' && 'username' in user) {
        token.id = user.id;
        token.username = user.username;
        console.log('🟢 [jwt] user con username:', user);
      } else if (user) {
        token.id = user.id;
        console.log('🟠 [jwt] user sin username:', user);
      }
      console.log('🔵 [jwt] token después:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('🟡 [session] session antes:', session);
      console.log('🟡 [session] token:', token);
      if (session.user) {
        session.user.id = token.id as string;
        if (token.username) {
          session.user.username = token.username as string;
          console.log('🟢 [session] username añadido a session.user:', token.username);
        }
      }
      console.log('🔵 [session] session después:', session);
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
