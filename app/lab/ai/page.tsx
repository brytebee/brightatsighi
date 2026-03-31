"use client";

import React, { useState } from "react";
import PipelineVisualizer from "@/components/PipelineVisualizer";

const SIMULATION_DOCS = [
  {
    id: "doc-1",
    type: "LEGAL_NDA_CONTRACT",
    title: "Non-Disclosure Agreement - Project Apollo",
    content: `This Non-Disclosure Agreement ("Agreement") is made between **Acme Corp** and **Global Tech Partners**.

The Parties agree to maintain confidentiality for a period of five (5) years.

Any breach of this Agreement will result in damages of **$500,000 USD.**

The confidential information includes, but is not limited to, proprietary algorithms, source code, and business strategies.

This Agreement is executed by **Sarah Jenkins**, CEO of Acme Corp.`,
  },
  {
    id: "doc-2",
    type: "GOVERNMENT_CIRCULAR",
    title: "CBN Regulatory Framework Update 2026",
    content: `Central Bank of Nigeria (CBN)
Circular reference: FPR/DIR/CON/VAR/01/054
To: All Deposit Money Banks, Mobile Money Operators, and Fintech Companies

SUBJECT: REVISED STANDARDS FOR ANTI-MONEY LAUNDERING (AML) AND COMBATING THE FINANCING OF TERRORISM (CFT)

Effective starting **May 1, 2026**, all regulated financial institutions must implement real-time heuristic scanning of transactions exceeding **₦5,000,000**.

Failure to comply will result in an immediate suspension of the operating license and a fine of **10% gross annual revenue**.

The Director of Financial Policy, **Mr. K. Olayinka**, emphasizes that manual batch-processing is no longer compliant. Institutions are advised to leverage Edge AI or similar latency-optimized architectures.`,
  },
  {
    id: "doc-3",
    type: "EARNINGS_TRANSCRIPT",
    title: "Q3 2025 Earnings Call - NVIDIA",
    content: `Operator: Welcome to the Q3 2025 NVIDIA Earnings Call.

**Jensen Huang** (CEO): We are seeing unprecedented demand for our new Blackwell architecture. Data center revenue is up **180% year-over-year**. However, we are facing severe supply chain constraints out of TSMC, which may hamper Q4 deliveries by up to 15%.

**Colette Kress** (CFO): Gross margins reached **76%**. Automotive revenue grew, but gaming saw a slight 2% dip. We anticipate Q4 revenue to be in the range of **$35 billion**, plus or minus 2%.

Analyst (Goldman Sachs): Given the TSMC constraints, do you foresee any delay in the Hopper refresh?

Jensen: No delays on Hopper. The constraints are strictly on advanced packaging for the newest Blackwell nodes.`,
  },
];

// Renders document content with **bold** markdown-style emphasis
function DocBody({ content }: { content: string }) {
  return (
    <div className="font-mono text-[12px] leading-loose text-gray-400 space-y-4 max-w-2xl">
      {content.split("\n\n").map((para, pi) => (
        <p key={pi}>
          {para.split(/(\*\*[^*]+\*\*)/).map((chunk, ci) => {
            if (chunk.startsWith("**") && chunk.endsWith("**")) {
              return (
                <strong key={ci} className="text-gray-100 font-bold not-italic">
                  {chunk.slice(2, -2)}
                </strong>
              );
            }
            return <span key={ci}>{chunk}</span>;
          })}
        </p>
      ))}
    </div>
  );
}

export default function AIPipelineLab() {
  const [activeDocId, setActiveDocId] = useState(SIMULATION_DOCS[0].id);
  const activeDoc = SIMULATION_DOCS.find((d) => d.id === activeDocId)!;

  return (
    <main className="dark min-h-screen bg-black text-white flex flex-col font-sans relative selection:bg-electric-lime selection:text-black h-screen overflow-hidden">

      {/* ── HEADER ── */}
      <header className="shrink-0 border-b border-white/[0.06] bg-black px-6 z-20">
        {/* Top row: back + title */}
        <div className="flex items-center gap-4 h-14">
          <a
            href="/lab"
            className="flex items-center justify-center w-8 h-8 border border-white/10 text-gray-500 hover:text-white hover:border-white/25 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>

          <div className="w-px h-5 bg-white/10" />

          <div>
            <h1 className="text-[13px] font-black uppercase tracking-[0.35em]">
              <span className="text-[#ccff00]">AI</span>{" "}
              <span className="text-white">Pipeline Lab</span>
            </h1>
            <p className="text-[9px] font-mono text-gray-500 tracking-widest mt-0.5">
              Structured Extraction Demo • Streaming Object JSON
            </p>
          </div>
        </div>

        {/* Tab bar — full width below title */}
        <div className="flex items-center gap-0 border-t border-white/[0.06] overflow-x-auto no-scrollbar">
          {SIMULATION_DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocId(doc.id)}
              className={`shrink-0 px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-r border-white/[0.06] ${
                activeDocId === doc.id
                  ? "bg-[#ccff00] text-black"
                  : "bg-transparent text-gray-500 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {doc.type}
            </button>
          ))}
        </div>
      </header>

      {/* ── WORKSPACE ── */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#050505]">

        {/* LEFT PANE — Document Viewer */}
        <section className="w-full md:w-1/2 flex flex-col h-full border-b md:border-b-0 md:border-r border-white/[0.06]">
          <div className="p-8 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10">
            {/* Doc title */}
            <h2 className="text-[18px] font-bold text-white mb-6 leading-snug">
              {activeDoc.title}
            </h2>

            {/* Doc body with bold highlighting */}
            <DocBody content={activeDoc.content} />
          </div>
        </section>

        {/* RIGHT PANE — Pipeline Visualizer */}
        <section className="w-full md:w-1/2 h-full relative z-0">
          <PipelineVisualizer
            key={activeDocId}
            documentType={activeDoc.type}
            documentText={activeDoc.content.replace(/\*\*/g, "")}
          />
        </section>

      </div>
    </main>
  );
}
