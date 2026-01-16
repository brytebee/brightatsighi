"use client";

import Link from "next/link";
import { createProject, deleteProject } from "@/app/actions/admin";

export default function ProjectsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          + New Project
        </Link>
      </div>

      <div className="grid gap-6">
        {/* We would map over projects here fetched from prisma in a real server component */}
        {/* Placeholder List */}
        <div className="flex justify-between items-center p-4 bg-surface border border-border rounded">
          <div>
            <h4 className="font-bold">Ohiole Lagos</h4>
            <p className="text-sm text-muted-foreground">
              E-commerce platform...
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-sm text-primary">Edit</button>
            <button className="text-sm text-destructive">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
