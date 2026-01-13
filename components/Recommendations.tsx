"use client";

import { portfolioData } from "@/lib/data";

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
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-foreground font-bold">
                  {rec.name[0]}
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
      </div>
    </section>
  );
}
