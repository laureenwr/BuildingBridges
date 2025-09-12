import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { getServerSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { type DefaultSession } from "next-auth";
import { comparePasswords } from "@/lib/auth/session";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      role?: "ADMIN" | "STUDENT" | "MENTOR";
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await db
          .select()
          .from(users)
          .where(and(eq(users.email, credentials.email), isNull(users.deletedAt)))
          .limit(1);

        const user = result[0];
        if (!user) return null;

        const ok = await comparePasswords(credentials.password, user.passwordHash);
        if (!ok) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
        } as any;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        if ((token as any).role) {
          session.user.role = (token as any).role as "ADMIN" | "STUDENT" | "MENTOR";
        } else {
          const dbUser = await db.query.users.findFirst({
            where: eq(users.id, parseInt(token.sub)),
          });
          if (dbUser) {
            session.user.role = dbUser.role as "ADMIN" | "STUDENT" | "MENTOR";
          }
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && (user as any).role) {
        (token as any).role = (user as any).role;
      }
      return token;
    },
  },
};

export const auth = () => getServerSession(authOptions); 