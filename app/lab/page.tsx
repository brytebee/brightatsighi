import React from "react";

const labs = [
  {
    id: "fintech",
    href: "/lab/fintech",
    status: "LIVE",
    statusColor: "#008751",
    version: "v4.0",
    title: "Fintech Compliance Engine",
    description:
      "A real-time AI compliance and fraud detection perimeter. Processes simulated transactions, scores AML/FRAUD risk, and generates compliance alerts — all in TypeScript. No Python, no ML model.",
    tags: ["Compliance", "AML", "Risk Scoring", "TypeScript", "Prisma"],
    metrics: [
      { label: "Detection speed", value: "<200ms" },
      { label: "Risk model", value: "Heuristic" },
      { label: "Alert types", value: "AML / FRAUD" },
    ],
    accent: "#008751",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "intelligence",
    href: "/intelligence",
    status: "LIVE",
    statusColor: "#008751",
    version: "v2.0",
    title: "Intelligence Platform",
    description:
      "An automated editorial intelligence system. The Architect-Agent drafts reports from news hooks, routes them through a human approval layer, and publishes to a dossier-style feed. Covers esports, fintech, policy, and AI.",
    tags: [
      "Architect-Agent",
      "Editorial AI",
      "Content Pipeline",
      "Prisma",
      "Next.js",
    ],
    metrics: [
      { label: "Agent", value: "Architect-Agent" },
      { label: "Output", value: "Dossier briefs" },
      { label: "Approval", value: "Human-in-loop" },
    ],
    accent: "#ccff00",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    id: "ai-pipeline",
    href: "/lab/ai",
    status: "LIVE",
    statusColor: "#008751",
    version: "v1.0",
    title: "AI Pipeline Lab",
    description:
      "A live LLM pipeline demonstrating real-time document analysis, summarisation, and structured extraction — running visibly in the browser.",
    tags: ["LLM", "Document AI", "Streaming", "Edge Functions"],
    metrics: [
      { label: "Pipeline", value: "Streaming Object" },
      { label: "Model", value: "Gemini 1.5 Flash" },
      { label: "Output", value: "Strict Schema" },
    ],
    accent: "#ccff00",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "ecommerce-intel",
    href: "/lab/ecommerce",
    status: "LIVE",
    statusColor: "#008751",
    version: "v4.0",
    title: "E-Commerce Intelligence",
    description:
      "Real-time pricing, inventory, and demand signal tracker for African e-commerce. Demonstrates how ML-lite heuristics can power product decisions without a data science team.",
    tags: ["Pricing AI", "Demand Signals", "E-Commerce", "Analytics"],
    metrics: [
      { label: "Data points", value: "Real-time" },
      { label: "Model type", value: "Heuristic" },
      { label: "Reaction", value: "<150ms" },
    ],
    accent: "#008751",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export default function LabIndexPage() {
  return (
    <div className="dark min-h-screen bg-black text-white selection:bg-[#ccff00]/20">
      {/* Background scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
        }}
      />
      {/* Ambient glows */}
      <div className="fixed top-0 left-0 w-[50%] h-[50%] bg-[#008751]/5 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-[#ccff00]/3 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/70 backdrop-blur-2xl px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest hidden md:block">
                Admin
              </span>
            </a>
            <div className="w-px h-5 bg-white/[0.06]" />
            <div>
              <h1 className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-white">
                The Lab
              </h1>
              <p className="font-mono text-[8px] text-[#008751] uppercase tracking-widest opacity-70">
                Live Systems. Running Now.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" />
            <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
              {labs.filter((l) => l.status === "LIVE").length} systems live
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 pb-32">
        {/* Hero block */}
        <div className="mb-16 space-y-4 max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-[#008751]" />
            <span className="font-mono text-[9px] text-[#008751] uppercase tracking-[0.4em] font-black">
              Architect-Built Systems
            </span>
          </div>
          <h2 className="text-[48px] md:text-[64px] font-black italic tracking-[-0.04em] leading-[0.9] text-white">
            RUNNING
            <br />
            SYSTEMS,
            <br />
            NOT MOCKUPS.
          </h2>
          <p className="text-[16px] text-gray-500 leading-relaxed max-w-xl font-medium">
            Every system here solves a real problem for a real industry. Built
            in production-grade TypeScript, running on live data, fully
            inspectable in the browser.
          </p>
        </div>

        {/* Systems grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labs.map((lab) => {
            const Wrapper = lab.href ? "a" : "div";
            return (
              <Wrapper
                key={lab.id}
                {...(lab.href ? { href: lab.href } : {})}
                className={`group relative flex flex-col bg-[#0a0a0a] border border-white/[0.05] rounded-[2rem] overflow-hidden transition-all duration-500 ${
                  lab.href
                    ? "hover:border-white/10 hover:scale-[1.01] cursor-pointer"
                    : "opacity-60 cursor-default"
                }`}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: lab.accent }}
                />

                {/* Hover glow */}
                {lab.href && (
                  <div
                    className="absolute top-0 right-0 w-40 h-40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full"
                    style={{ background: `${lab.accent}15` }}
                  />
                )}

                <div className="p-7 flex flex-col h-full gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${lab.accent}18`,
                        color: lab.accent,
                      }}
                    >
                      {lab.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: lab.statusColor }}
                      />
                      <span
                        className="font-mono text-[9px] font-black uppercase tracking-[0.2em]"
                        style={{ color: lab.statusColor }}
                      >
                        {lab.status}
                      </span>
                      <span className="font-mono text-[9px] text-gray-700">
                        {lab.version}
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="space-y-2">
                    <h3 className="text-[20px] font-black tracking-tight text-white leading-tight group-hover:text-[#ccff00] transition-colors duration-300">
                      {lab.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                      {lab.description}
                    </p>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2">
                    {lab.metrics.map(({ label, value }) => (
                      <div
                        key={label}
                        className="p-3 bg-white/[0.02] border border-white/[0.04] rounded-xl"
                      >
                        <p className="font-mono text-[8px] text-gray-700 uppercase tracking-widest mb-1">
                          {label}
                        </p>
                        <p
                          className="font-mono text-[11px] font-black"
                          style={{ color: lab.accent }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tags + CTA */}
                  <div className="flex items-end justify-between gap-3 mt-auto pt-4 border-t border-white/[0.04]">
                    <div className="flex flex-wrap gap-1.5">
                      {lab.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {lab.href && (
                      <div className="flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.15em] text-gray-500 group-hover:text-white transition-colors shrink-0">
                        Enter
                        <svg
                          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.04]" />
          <p className="font-mono text-[9px] text-gray-700 uppercase tracking-[0.3em]">
            All systems built by Bright Atsighi // @brytebee
          </p>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>
      </main>
    </div>
  );
}
