import Link from "next/link";

export default function WritingPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Writing</h2>
        <Link
          href="/admin/writing/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
        >
          + Write Story
        </Link>
      </div>

      <div className="grid gap-4">
        {/* Placeholder */}
        <div className="p-4 border border-border rounded flex justify-between">
          <span>Understanding Scalable Backend Architectures</span>
          <span className="text-muted-foreground text-sm">Draft</span>
        </div>
      </div>
    </div>
  );
}
