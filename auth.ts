import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const validEmail = process.env.AUTH_USER_EMAIL;
        const validPasswordHash = process.env.AUTH_USER_PASSWORD_HASH;

        if (!validEmail || !validPasswordHash) {
          throw new Error(
            "AUTH_USER_EMAIL / AUTH_USER_PASSWORD_HASH are not configured",
          );
        }

        if (email !== validEmail) {
          return null;
        }

        const valid = await bcrypt.compare(password, validPasswordHash);
        if (!valid) {
          return null;
        }

        return { id: "owner", email };
      },
    }),
  ],
});
