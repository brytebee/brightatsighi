"use client";

export default function Blog() {
  return (
    <section className="py-24 px-6 md:px-20 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">WRITING</h2>
        <p className="text-muted-foreground mb-12">
          Thoughts on Engineering, Scalability, and Life.
        </p>

        <div className="p-12 border border-dashed border-border rounded-xl bg-surface/50">
          <p className="text-xl font-mono text-muted-foreground animate-pulse">
            Coming Soon...
          </p>
        </div>
      </div>
    </section>
  );
}
