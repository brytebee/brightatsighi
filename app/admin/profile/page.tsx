"use client";

import { updateProfile } from "@/app/actions/admin";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>
      <form action={updateProfile} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            name="name"
            type="text"
            className="w-full p-3 bg-surface border border-border rounded"
            defaultValue="Bright Atsighi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input
            name="role"
            type="text"
            className="w-full p-3 bg-surface border border-border rounded"
            defaultValue="Full Stack Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input
            name="tagline"
            type="text"
            className="w-full p-3 bg-surface border border-border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Summary</label>
          <textarea
            name="summary"
            rows={5}
            className="w-full p-3 bg-surface border border-border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
