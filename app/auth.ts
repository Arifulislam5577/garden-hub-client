import { TUser } from "@/types";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/sign-in`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user = data.data;

          if (user) {
            return user;
          }

          return null;
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to sign in";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as TUser;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && typeof token.user === "object") {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});
