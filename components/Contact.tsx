"use client";

import { portfolioData } from "@/lib/data";

export default function Contact() {
  const { callToAction } = portfolioData;

  return (
    <footer className="py-32 px-6 md:px-20 bg-background border-t border-border text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          {callToAction.text}
        </h2>
        <a
          href={`mailto:${callToAction.email}`}
          className="inline-block px-8 py-4 bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-colors rounded-full"
        >
          Get In Touch
        </a>

        <div className="pt-20 text-muted-foreground text-sm font-mono">
          <p>
            © {new Date().getFullYear()} Engineered Portfolio. Built with
            Next.js 16 & Tailwind 4.
          </p>
        </div>
      </div>
    </footer>
  );
}
