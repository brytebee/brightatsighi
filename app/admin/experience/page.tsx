import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Experience</h2>
        <Link
          href="/admin/experience/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          + Add Experience
        </Link>
      </div>

      <div className="space-y-4">
        {/* Placeholder for list */}
        <p className="text-muted-foreground">
          Managing your professional timeline.
        </p>
      </div>
    </div>
  );
}
