"use client";

import { portfolioData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Hero() {
  const { personalInfo } = portfolioData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-20 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Intro Text */}
        <div className="space-y-6 animate-in slide-in-from-left duration-700 fade-in">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-10 bg-accent inline-block"></span>
            <span className="font-mono text-accent text-sm tracking-widest uppercase">
              {personalInfo.role}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {personalInfo.name.toUpperCase()}
          </h1>

          <p className="text-xl text-muted-foreground/80 max-w-lg leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex gap-4 pt-4">
            {personalInfo.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border bg-secondary/50 hover:bg-secondary hover:border-accent transition-all duration-300 text-sm font-mono text-foreground"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Data/Code Visualization */}
        <div
          className={`relative group ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          } transition-all duration-1000 delay-300`}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-lg bg-surface border border-border p-6 font-mono text-sm overflow-hidden shadow-2xl">
            <div className="flex gap-2 mb-4 border-b border-border pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-muted-foreground/60">
                developer_profile.json
              </span>
            </div>

            <div className="text-foreground/80 space-y-1">
              <p>
                <span className="text-purple-600 dark:text-purple-400">
                  const
                </span>{" "}
                <span className="text-yellow-600 dark:text-yellow-300">
                  profile
                </span>{" "}
                ={" "}
                <span className="text-blue-600 dark:text-blue-400">{`{`}</span>
              </p>
              <p className="pl-4">
                <span className="text-cyan-600 dark:text-cyan-400">
                  "status"
                </span>
                :{" "}
                <span className="text-green-600 dark:text-green-400">
                  "Available for hire"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span className="text-cyan-600 dark:text-cyan-400">
                  "experience"
                </span>
                :{" "}
                <span className="text-orange-500 dark:text-orange-400">
                  "6+ Years"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span className="text-cyan-600 dark:text-cyan-400">
                  "location"
                </span>
                :{" "}
                <span className="text-green-600 dark:text-green-400">
                  "{personalInfo.location}"
                </span>
                ,
              </p>
              <p className="pl-4">
                <span className="text-cyan-600 dark:text-cyan-400">
                  "tech_stack"
                </span>
                : <span className="text-blue-600 dark:text-blue-400">[</span>
              </p>
              <p className="pl-8 text-muted-foreground/60">
                "Next.js", "React", "Node.js",
              </p>
              <p className="pl-8 text-muted-foreground/60">
                "TypeScript", "Cloud Architecture"
              </p>
              <p className="pl-4">
                <span className="text-blue-600 dark:text-blue-400">]</span>,
              </p>
              <p className="pl-4">
                <span className="text-cyan-600 dark:text-cyan-400">
                  "mission"
                </span>
                :{" "}
                <span className="text-green-600 dark:text-green-400">
                  "Solve business problems"
                </span>
              </p>
              <p>
                <span className="text-blue-600 dark:text-blue-400">{`}`}</span>;
              </p>
            </div>

            <div className="mt-6 flex justify-between items-end border-t border-border pt-4">
              <span className="text-xs text-muted-foreground/50">ReadOnly</span>
              <span className="text-xs text-accent animate-pulse">
                ● System Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
