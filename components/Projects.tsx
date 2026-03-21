"use client";

import { portfolioData } from "@/lib/data";
import NextImage from "next/image";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="py-32 md:py-48 px-5 sm:px-8 border-t border-black/5 dark:border-white/5 relative bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#1A237E]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div data-reveal className="reveal-item mb-24 md:mb-32">
          <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 dark:text-[#00E676] uppercase">
            Selected Works
          </span>
          <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[56px] text-foreground">
            Engineering <span className="text-indigo-500 dark:text-[#8C9EFF]">Impact.</span>
          </h2>
        </div>

        <div className="space-y-32 md:space-y-48">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >
              {/* Project Info - Left Side */}
              <div 
                data-reveal 
                className="reveal-item lg:col-span-5 space-y-6 lg:order-1 order-2"
                style={{ transitionDelay: '0ms' }}
              >
                <div className="flex items-center gap-4 text-slate-400 dark:text-[#8C9EFF]/60 font-mono text-[13px] font-bold tracking-widest uppercase">
                  <span>0{idx + 1}</span>
                  <span className="h-[1px] w-12 bg-slate-300 dark:bg-[#8C9EFF]/30"></span>
                  <span className="text-emerald-600 dark:text-[#00E676]">Featured Case Study</span>
                </div>

                <h3 className="text-[32px] md:text-[40px] font-black tracking-[-0.03em] text-foreground leading-tight">
                  {project.title}
                </h3>

                <p className="text-[16px] md:text-[18px] leading-[1.8] text-slate-600 dark:text-[#8C9EFF]/80">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="py-5 my-5 border-y border-black/10 dark:border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-[#1A237E]/30 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-[#8C9EFF]/20">
                        <span className="text-[14px]">📈</span>
                      </div>
                      <p className="text-[15px] font-medium text-slate-700 dark:text-foreground/90 leading-relaxed italic">
                        "{project.metrics}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[12px] font-mono font-semibold text-indigo-700 dark:text-[#8C9EFF] px-3 py-1.5 bg-indigo-50 dark:bg-[#8C9EFF]/10 border border-indigo-200 dark:border-[#8C9EFF]/20 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-6 py-3 text-[14px] font-bold text-foreground transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 hover:scale-105 active:scale-95"
                    >
                      Explore Application
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 ml-1 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-[14px] font-semibold text-indigo-500 dark:text-[#8C9EFF]/70 transition-colors hover:text-foreground py-3"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      View Architecture
                    </a>
                  )}
                </div>
              </div>

              {/* Project Visual - Right Side */}
              <div 
                data-reveal 
                className="reveal-item lg:col-span-7 relative w-full lg:order-2 order-1"
                style={{ transitionDelay: '200ms' }}
              >
                {/* Glow behind the image */}
                <div className="absolute inset-4 rounded-[32px] bg-linear-to-tr from-[#1A237E]/40 to-[#00E676]/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />
                
                <div className="relative aspect-16/10 bg-background border border-black/10 dark:border-white/10 rounded-[32px] overflow-hidden shadow-2xl group-hover:border-black/20 dark:group-hover:border-white/20 transition-all duration-500">
                  {project.image ? (
                    <div className="relative w-full h-full p-2">
                       {/* Nested inner border to create a "device casing" look */}
                       <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 bg-foreground/5 dark:bg-[#0a0f25]">
                          <NextImage
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          {/* Very subtle noise overlay */}
                          <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center p-2">
                      <div className="relative w-full h-full rounded-[24px] bg-foreground/5 dark:bg-[#0a0f25] border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8C9EFF0a_1px,transparent_1px),linear-gradient(to_bottom,#8C9EFF0a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                        <span className="font-mono text-foreground/5 dark:text-white/5 text-[120px] font-black tracking-tighter">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
