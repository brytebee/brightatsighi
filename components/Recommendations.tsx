"use client";

import { portfolioData } from "@/lib/data";
import Image from "next/image";

export default function Recommendations() {
  const { recommendations } = portfolioData;

  return (
    <section className="py-24 px-6 md:px-20 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-16">
          ENDORSEMENTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="bg-surface p-8 border border-border rounded-xl text-left relative"
            >
              <span className="text-6xl text-muted-foreground/10 absolute top-4 left-4 font-serif">
                "
              </span>
              <p className="text-muted-foreground italic mb-6 relative z-10 leading-relaxed">
                {rec.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center text-foreground font-bold shrink-0">
                  {rec.image ? (
                    <Image
                      src={rec.image}
                      alt={rec.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    rec.name[0]
                  )}
                </div>
                <div>
                  <h5 className="text-foreground font-bold text-sm">
                    {rec.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {rec.role}, {rec.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {portfolioData.recommendationsExternalLink && (
          <div className="mt-12">
            <a
              href={portfolioData.recommendationsExternalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors border-b border-primary/20 hover:border-primary pb-0.5"
            >
              See more recommendations
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
        )}
      </div>
    </section>
  );
}
