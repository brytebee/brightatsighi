import { Suspense } from "react";
import BlogList from "./blog/BlogList";
import BlogSkeleton from "./blog/BlogSkeleton";

export default function Blog() {
  return (
    <section className="py-24 px-6 md:px-20 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">WRITING</h2>
          <p className="text-muted-foreground">
            Thoughts on Engineering, Scalability, and Life.
          </p>
        </div>

        <Suspense fallback={<BlogSkeleton />}>
          <BlogList />
        </Suspense>

        <div className="mt-12 text-center">
          <a
            href="https://medium.com/@brytebee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border-b border-primary/20 hover:border-primary pb-0.5"
          >
            Read more on Medium
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
