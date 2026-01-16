import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          // Simple Env-based check
          // In production, these should be securely set in Vercel/VPS env vars
          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;

          console.log("Attempting Login:");
          console.log("Input:", { email, password });
          console.log("Expected:", { adminEmail, adminPassword });

          if (email === adminEmail && password === adminPassword) {
            return { id: "1", name: "Admin", email: adminEmail };
          }
        }

        console.log("Invalid credentials or parsing failed");
        return null;
      },
    }),
  ],
});
