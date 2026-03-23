"use server";

import { signIn } from "@/auth";

export async function authenticateWithGoogle() {
  await signIn("google", {
    redirectTo: "/admin",
  });
}

export async function logout() {
  await import("@/auth").then((mod) => mod.signOut({ redirectTo: "/login" }));
}
