"use client";

import { useRef, useState, useTransition } from "react";
import { addTeamMemberAction } from "@/app/actions/team";

const ROLES = ["Admin", "Moderator"];

export default function AddTeamMemberForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();

    if (!email) {
      setError("Email is required.");
      return;
    }

    startTransition(async () => {
      try {
        await addTeamMemberAction(formData);
        setSuccess(`${email} added successfully.`);
        formRef.current?.reset();
      } catch (err: any) {
        setError(err?.message ?? "Something went wrong.");
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Google Account Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="moderator@gmail.com"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            Role
          </label>
          <select
            name="role"
            defaultValue="Moderator"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {success && (
        <p className="text-sm text-green-400 font-medium">✓ {success}</p>
      )}
      {error && (
        <p className="text-sm text-red-400 font-medium">✗ {error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : (
          "Add Member"
        )}
      </button>
    </form>
  );
}
