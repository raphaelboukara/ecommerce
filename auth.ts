import NextAuth, { type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import authConfig from '@/auth.config';
import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { type UserRole } from '@prisma/client';

import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's role. */
      role: UserRole;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {},
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const user = await getUserById(token.sub);

      if (!user) {
        return token;
      }

      token.role = user.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
