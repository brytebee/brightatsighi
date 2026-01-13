"use client";

import { portfolioData } from "@/lib/data";
import NextImage from "next/image";

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="py-24 px-6 md:px-20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-16 flex items-center gap-4">
          <span className="text-accent">/</span> SELECTED WORKS
        </h2>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Project Info - Left Side */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <div className="flex items-center gap-4 text-muted-foreground font-mono text-sm">
                  <span>0{idx + 1}</span>
                  <span className="h-[1px] w-12 bg-border"></span>
                  <span>FEATURED</span>
                </div>

                <h3 className="text-4xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="py-4 border-y border-border">
                    <p className="text-accent font-mono text-sm">
                      &gt; {project.metrics}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-muted-foreground px-2 py-1 bg-secondary rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 flex gap-6">
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-foreground border-b border-accent pb-1 hover:opacity-80 transition-opacity"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>

              {/* Project Visual - Right Side */}
              <div className="lg:col-span-7 relative">
                <div className="aspect-video bg-surface border border-border rounded-lg overflow-hidden relative group-hover:border-accent/30 transition-all duration-500">
                  {project.image ? (
                    <div className="relative w-full h-full">
                      <NextImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay to ensure text/design consistency on hover or dark mode */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-border via-surface to-surface"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-foreground text-6xl opacity-10 font-bold">
                          {project.title.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                    </>
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
