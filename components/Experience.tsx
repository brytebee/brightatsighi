"use client";

import { portfolioData } from "@/lib/data";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className="py-24 px-6 md:px-20 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-16 text-center">
          EXPERIENCE{" "}
          <span className="text-muted-foreground block text-lg font-normal mt-2 font-mono">
            Professional Timeline
          </span>
        </h2>

        <div className="relative border-l border-border ml-4 md:ml-12 space-y-12">
          {experience.map((role, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Timeline Node */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>

              <div className="bg-surface p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors shadow-md">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {role.role}
                  </h3>
                  <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                    {role.period}
                  </span>
                </div>

                <h4 className="text-lg text-muted-foreground mb-4">
                  {role.company}
                </h4>

                <ul className="space-y-2">
                  {role.description.map((point, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-accent mt-1.5 text-[10px]">➢</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
