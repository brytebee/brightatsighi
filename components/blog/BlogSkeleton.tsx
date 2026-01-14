"use client";

import { useEffect } from "react";

export default function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-64 bg-surface border border-border rounded-xl flex flex-col p-6"
        >
          <div className="h-4 w-24 bg-border/50 rounded mb-4"></div>
          <div className="h-6 w-full bg-border/50 rounded mb-2"></div>
          <div className="h-6 w-2/3 bg-border/50 rounded mb-4"></div>
          <div className="flex-1"></div>
          <div className="h-4 w-20 bg-border/50 rounded"></div>
        </div>
      ))}
    </div>
  );
}
