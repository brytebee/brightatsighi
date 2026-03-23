export default function TeamLoading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-surface border border-border rounded w-48 mb-3"></div>
        <div className="h-4 bg-surface border border-border rounded w-96"></div>
      </div>

      {/* Add Form Skeleton */}
      <div className="mb-8 p-6 bg-surface border border-border rounded-xl">
        <div className="h-6 bg-surface-foreground/10 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 h-10 bg-surface-foreground/5 rounded-lg border border-border"></div>
          <div className="h-10 bg-surface-foreground/5 rounded-lg border border-border"></div>
        </div>
        <div className="mt-4 h-10 bg-primary/20 rounded-lg w-32"></div>
      </div>

      {/* Member List Skeleton */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="h-6 bg-surface-foreground/10 rounded w-32"></div>
          <div className="h-4 bg-surface-foreground/5 rounded w-16"></div>
        </div>

        <ul className="divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-foreground/10 shrink-0"></div>
                <div>
                  <div className="h-4 bg-surface-foreground/10 rounded w-32 mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-3 bg-surface-foreground/5 rounded w-16"></div>
                    <div className="h-3 bg-surface-foreground/5 rounded w-16"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 bg-surface-foreground/5 rounded w-16 border border-border"></div>
                <div className="h-8 bg-surface-foreground/5 rounded w-20 border border-border"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
