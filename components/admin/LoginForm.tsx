"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={dispatch} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="admin@brytebee.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          className="w-full p-3 bg-surface border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="••••••"
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm font-medium">{errorMessage}</div>
      )}

      <button
        type="submit"
        aria-disabled={isPending}
        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "Logging in..." : "Access Dashboard"}
      </button>
    </form>
  );
}
