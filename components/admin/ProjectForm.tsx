"use client";

import { useTransition } from "react";
import { createProject } from "@/app/actions/admin";
import { useRouter } from "next/navigation";

export default function ProjectForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      await createProject(formData);
      router.push("/admin/projects");
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-6 max-w-2xl bg-surface p-6 rounded-xl border border-border"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium">Project Title</label>
        <input
          name="title"
          required
          className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="e.g. E-Commerce Platform"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          required
          rows={4}
          className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="Describe the project..."
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">
          Technologies (Comma separated)
        </label>
        <input
          name="technologies"
          className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="Next.js, TypeScript, Prisma, Docker"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Live Link</label>
          <input
            name="link"
            type="url"
            className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="https://..."
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Repo Link</label>
          <input
            name="repo"
            type="url"
            className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Metrics/Outcome</label>
        <input
          name="metrics"
          className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="e.g. 20% increase in conversions"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Image Path</label>
        <input
          name="image"
          className="w-full p-3 bg-background border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          placeholder="/public/images/project.png"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Create Project"}
      </button>
    </form>
  );
}
