"use client";

import { portfolioData } from "@/lib/data";

export default function SkillMatrix() {
  const { skills } = portfolioData;

  return (
    <section className="py-20 px-6 md:px-20 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            TECHNICAL ARSENAL
          </h2>
          <div className="h-1 w-20 bg-accent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className="group p-6 border border-border hover:border-accent/50 bg-surface transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="text-accent font-mono text-lg mb-6 flex items-center gap-2">
                <span className="text-sm opacity-50">0{idx + 1}.</span>{" "}
                {skillGroup.category.toUpperCase()}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm text-muted-foreground bg-background border border-border hover:text-foreground hover:border-foreground transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
