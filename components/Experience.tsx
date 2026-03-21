"use client";

import { portfolioData } from "@/lib/data";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className="py-32 md:py-48 px-5 sm:px-8 border-t border-black/5 dark:border-white/5 relative z-10 bg-background">
      <div className="max-w-4xl mx-auto">
        <div data-reveal className="reveal-item mb-20 text-center">
          <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 dark:text-[#00E676] uppercase">
            Trajectory
          </span>
          <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[56px] text-foreground">
            Professional <span className="text-indigo-500 dark:text-[#8C9EFF]">Timeline.</span>
          </h2>
        </div>

        <div className="relative border-l-2 border-[#1A237E]/50 ml-4 md:ml-12 space-y-16">
          {experience.map((role, idx) => (
            <div data-reveal key={idx} className="reveal-item relative pl-8 md:pl-12" style={{ transitionDelay: `${idx * 100}ms` }}>
              {/* Glowing Timeline Marker */}
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-background border-4 border-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.5)] z-10" />

              <div className="group rounded-[28px] border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 p-8 md:p-10 backdrop-blur-xl transition-all duration-300 hover:border-black/15 dark:hover:border-white/15 hover:bg-black/10 dark:hover:bg-white/10 shadow-2xl">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                  <div>
                    <h3 className="text-[22px] md:text-[26px] font-black tracking-[-0.02em] text-foreground leading-tight">
                      {role.role}
                    </h3>
                    <h4 className="text-[16px] md:text-[18px] font-medium text-indigo-600 dark:text-[#8C9EFF]/90 mt-1">
                      {role.company}
                    </h4>
                  </div>
                  <span className="inline-flex items-center font-mono text-[13px] font-bold tracking-tight text-emerald-700 dark:text-[#00E676] bg-emerald-50 dark:bg-[#00E676]/10 border border-emerald-200 dark:border-[#00E676]/20 px-3 py-1.5 rounded-full whitespace-nowrap h-fit">
                    {role.period}
                  </span>
                </div>

                <ul className="space-y-4">
                  {role.description.map((point, i) => (
                    <li
                      key={i}
                      className="text-[15px] md:text-[16px] leading-[1.7] text-slate-600 dark:text-[#8C9EFF]/80 flex items-start gap-4 transition-colors group-hover:text-slate-800 dark:group-hover:text-[#8C9EFF]/95"
                    >
                      <span className="inline-flex mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-[#00E676]/60 shrink-0" />
                      <span>{point}</span>
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
