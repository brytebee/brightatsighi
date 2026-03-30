"use client";

import React, { useState } from "react";
import PipelineVisualizer from "@/components/PipelineVisualizer";

const SIMULATION_DOCS = [
  {
    id: "doc-1",
    type: "LEGAL_NDA_CONTRACT",
    title: "Non-Disclosure Agreement - Project Apollo",
    content: `This Non-Disclosure Agreement (the "Agreement") is entered into by and between Acme Corp ("Disclosing Party") and Global Tech Partners ("Receiving Party"), collectively referred to as the "Parties".
    
1. Confidential Information: Consists of proprietary algorithms, financial projections for Q4, and unreleased source code related to 'Project Apollo'.
2. Exclusions: Information already known to the Receiving Party or public domain knowledge is excluded.
3. Term: The obligations of confidentiality shall remain in effect for a period of five (5) years from the Effective Date.
4. Breach: In the event of unauthorized disclosure, Disclosing Party is entitled to seek injunctive relief and damages of no less than $500,000 USD. 
    
Note: The CEO of Global Tech, Sarah Jenkins, highlighted concerns regarding the 5-year term during early negotiations.`
  },
  {
    id: "doc-2",
    type: "GOVERNMENT_CIRCULAR",
    title: "CBN Regulatory Framework Update 2026",
    content: `Central Bank of Nigeria (CBN)
Circular reference: FPR/DIR/CON/VAR/01/054
To: All Deposit Money Banks, Mobile Money Operators, and Fintech Companies
    
SUBJECT: REVISED STANDARDS FOR ANTI-MONEY LAUNDERING (AML) AND COMBATING THE FINANCING OF TERRORISM (CFT)
    
Effective starting May 1, 2026, all regulated financial institutions must implement real-time heuristic scanning of transactions exceeding ₦5,000,000. 
Failure to comply will result in an immediate suspension of the operating license and a fine of 10% gross annual revenue.
The Director of Financial Policy, Mr. K. Olayinka, emphasizes that manual batch-processing is no longer compliant. Institutions are advised to leverage Edge AI or similar latency-optimized architectures.`
  },
  {
    id: "doc-3",
    type: "EARNINGS_TRANSCRIPT",
    title: "Q3 2025 Earnings Call - NVIDIA",
    content: `Operator: Welcome to the Q3 2025 NVIDIA Earnings Call.
    
Jensen Huang (CEO): We are seeing unprecedented demand for our new Blackwell architecture. Data center revenue is up 180% year-over-year. However, we are facing severe supply chain constraints out of TSMC, which may hamper Q4 deliveries by up to 15%.
Colette Kress (CFO): Gross margins reached 76%. Automotive revenue grew, but gaming saw a slight 2% dip. Our focus remains resolutely on scaling AI infrastructure globally. We anticipate Q4 revenue to be in the range of $35 billion, plus or minus 2%.
    
Analyst (Goldman Sachs): Given the TSMC constraints, do you foresee any delay in the Hopper refresh?
Jensen: No delays on Hopper. The constraints are strictly on advanced packaging for the newest Blackwell nodes.`
  }
];

export default function AIPipelineLab() {
  const [activeDocId, setActiveDocId] = useState(SIMULATION_DOCS[0].id);
  const activeDoc = SIMULATION_DOCS.find(d => d.id === activeDocId)!;

  // We add a key to unmount and remount PipelineVisualizer when doc changes
  return (
    <main className="dark min-h-screen bg-black text-white flex flex-col font-sans relative selection:bg-electric-lime selection:text-black h-screen overflow-hidden">
      {/* HEADER */}
      <header className="shrink-0 h-16 border-b border-white/5 bg-black/50 backdrop-blur px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <a href="/lab" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
            <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </a>
          <div className="w-px h-6 bg-white/10" />
          <div>
            <h1 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="text-[#ccff00]">AI</span> Pipeline Lab
            </h1>
            <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">
              Structured Extraction Demo • Streaming Object JSON
            </p>
          </div>
        </div>
      </header>

      {/* WORKSPACE */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-[#0A0A0A]">
        {/* LEFT PANE - DOCUMENT SELECTOR & VIEWER */}
        <section className="w-full md:w-1/2 flex flex-col h-full border-b md:border-b-0 border-white/5">
          {/* Doc selector bar */}
          <div className="shrink-0 flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5 overflow-x-auto no-scrollbar">
            {SIMULATION_DOCS.map(doc => (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`shrink-0 px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  activeDocId === doc.id
                    ? "bg-[#ccff00] text-black"
                    : "bg-black border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {doc.type}
              </button>
            ))}
          </div>
          
          {/* Raw Text View */}
          <div className="p-6 md:p-10 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-6">
              {activeDoc.title}
            </h2>
            <div className="font-mono text-[12px] leading-relaxed text-gray-400 whitespace-pre-wrap selection:bg-[#ccff00]/20 max-w-2xl">
              {activeDoc.content}
            </div>
          </div>
        </section>

        {/* RIGHT PANE - PIPELINE STREAMS HERE */}
        <section className="w-full md:w-1/2 h-full relative z-0">
          <PipelineVisualizer 
            key={activeDocId} 
            documentType={activeDoc.type} 
            documentText={activeDoc.content} 
          />
        </section>
      </div>
    </main>
  );
}
