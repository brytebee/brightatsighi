"use client";

import { experimental_useObject } from "@ai-sdk/react";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

const schema = z.object({
  metadata: z.object({
    primaryTopic: z.string(),
    classificationLevel: z.enum(["PUBLIC", "INTERNAL", "CONFIDENTIAL", "RESTRICTED"]),
    estimatedReadingTimeMinutes: z.number(),
  }),
  entities: z.array(
    z.object({
      name: z.string(),
      type: z.enum(["PERSON", "ORGANIZATION", "LOCATION", "CONCEPT", "TECHNOLOGY"]),
      relevanceScore: z.number(),
    })
  ),
  riskAssessment: z.object({
    riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
    keyRiskFactors: z.array(z.string()),
  }),
  executiveSynthesis: z.string(),
});

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-[3px] h-4 bg-[#ccff00] shrink-0" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
        {label}
      </span>
    </div>
  );
}

function getRiskColor(level?: string) {
  switch (level) {
    case "CRITICAL": return "text-red-500";
    case "HIGH":     return "text-orange-500";
    case "MEDIUM":   return "text-yellow-400";
    case "LOW":      return "text-[#008751]";
    default:         return "text-gray-500";
  }
}

export default function PipelineVisualizer({
  documentText,
  documentType,
}: {
  documentText: string;
  documentType: string;
}) {
  const { object, submit, isLoading, error } = experimental_useObject({
    api: "/api/pipeline/extract",
    schema,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [object]);

  const handleRun = () => {
    setHasStarted(true);
    submit({ documentType, content: documentText });
  };

  // ── IDLE STATE ──────────────────────────────────────────────
  if (!hasStarted) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-black border-l border-white/[0.06] relative group overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-black uppercase tracking-[0.25em] text-white mb-2">
            Pipeline Ready
          </h3>
          <p className="text-gray-500 text-[12px] font-mono text-center max-w-xs mb-8 leading-relaxed">
            Awaiting initialization. Edge function will invoke{" "}
            <span className="text-[#ccff00]">gemini-1.5-flash</span> and stream
            structured extraction to the client.
          </p>
          <button
            onClick={handleRun}
            className="px-8 py-3 bg-[#ccff00] text-black font-black uppercase tracking-widest text-[10px] hover:bg-[#aacc00] transition-colors border-b-2 border-r-2 border-black active:translate-y-px active:translate-x-px"
          >
            Initialize Extraction
          </button>
        </div>
      </div>
    );
  }

  // ── STREAM STATE ─────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col bg-[#050505] border-l border-white/[0.06] font-mono text-sm relative overflow-hidden">

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ── PANE HEADER ── */}
      <div className="shrink-0 h-12 border-b border-white/[0.06] bg-black flex items-center justify-between px-5 z-10">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isLoading ? "bg-red-500 animate-pulse" : "bg-[#008751]"}`} />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
            [{isLoading ? "EXTRACTING_STREAM..." : "STREAM_COMPLETE"}]
          </span>
        </div>
        <div className="text-[9px] text-[#ccff00] uppercase tracking-widest border border-[#ccff00]/30 px-2.5 py-1 font-black">
          gemini-1.5-flash
        </div>
      </div>

      {/* ── STREAM OUTPUT ── */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-8 relative z-10
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-white/10"
      >
        {/* Error */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/5 p-4 text-red-500">
            <p className="font-bold flex items-center gap-2">
              <span className="animate-pulse">⚠</span> Pipeline Terminated
            </p>
            <p className="mt-2 text-[11px] opacity-80">{error.message}</p>
            {error.message.includes("API_KEY") && (
              <p className="mt-2 text-[11px] font-bold bg-white/10 p-2 text-white">
                Ensure GOOGLE_GENERATIVE_AI_API_KEY is defined in .env
              </p>
            )}
          </div>
        )}

        {/* Connecting */}
        {!object && !error && (
          <div className="flex items-center gap-3 text-gray-600 text-[11px]">
            <span className="animate-spin text-[#ccff00]">⧗</span>
            Opening stream connection...
          </div>
        )}

        {object && (
          <div className="space-y-8">

            {/* ── [1] CONTEXT METADATA ── */}
            {(object?.metadata?.primaryTopic || object?.metadata?.classificationLevel) && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionLabel label="Context Metadata" />
                <div className="space-y-2">
                  {/* Classification — inline label + value */}
                  <div className="flex items-center gap-3 px-4 py-3 border border-white/[0.08] bg-white/[0.02]">
                    <span className="text-[11px] text-gray-500">Classification</span>
                    <span className={`font-black text-[13px] tracking-wide ${
                      object.metadata?.classificationLevel === "PUBLIC"
                        ? "text-[#008751]"
                        : "text-[#ccff00]"
                    }`}>
                      {object.metadata?.classificationLevel ?? "ANALYZING..."}
                    </span>
                  </div>
                  {/* Primary Topic — inline */}
                  <div className="flex items-center gap-3 px-4 py-3 border border-white/[0.08] bg-white/[0.02]">
                    <span className="text-[11px] text-gray-500">Primary Topic</span>
                    <span className="font-bold text-[12px] text-white">
                      {object.metadata?.primaryTopic ?? "STREAMING..."}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ── [2] HEURISTIC RISK VECTOR ── */}
            {object?.riskAssessment?.riskLevel && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionLabel label="Heuristic Risk Vector" />
                <div className="border border-white/[0.08] bg-black/40 p-5 space-y-4">
                  {/* Threat level — inline italic */}
                  <p className="text-[13px]">
                    <span className="text-gray-400 italic">Threat Level: </span>
                    <span className={`font-black text-xl italic tracking-wider ${getRiskColor(object.riskAssessment.riskLevel)}`}>
                      {object.riskAssessment.riskLevel}
                    </span>
                  </p>
                  {/* Risk factor bullets */}
                  {(object.riskAssessment.keyRiskFactors?.length ?? 0) > 0 && (
                    <ul className="space-y-2.5 border-t border-white/5 pt-4">
                      {(object.riskAssessment.keyRiskFactors ?? [])
                        .filter((rf): rf is string => !!rf)
                        .map((rf, i) => (
                          <li key={i} className="text-[11px] text-gray-400 flex items-start gap-2.5">
                            <span className="text-electric-lime shrink-0 mt-px font-bold">→</span>
                            {rf}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* ── [3] ENTITY RECOGNITION ── */}
            {object?.entities && object.entities.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <SectionLabel label="Entity Recognition" />
                {/* 3-column horizontal grid matching image */}
                <div className="grid grid-cols-3 gap-2">
                  {object.entities.slice(0, 6).map((ent: any, i: number) => (
                    <div
                      key={i}
                      className="flex flex-col border border-white/[0.08] bg-white/[0.02] p-3 gap-2"
                    >
                      {/* Name + score on one row */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-white text-[11px] truncate">
                          {ent.name || "..."}
                        </span>
                        <span className="text-[#ccff00] font-black text-[10px] shrink-0">
                          {ent.relevanceScore || 0}%
                        </span>
                      </div>
                      {/* Type label */}
                      <span className="text-[9px] text-gray-600 uppercase tracking-widest">
                        {ent.type || "..."}
                      </span>
                      {/* Green progress bar at bottom */}
                      <div className="w-full bg-white/[0.05] h-[3px]">
                        <div
                          className="bg-[#008751] h-full transition-all duration-700"
                          style={{ width: `${Math.min(100, ent.relevanceScore || 0)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── [4] EXECUTIVE SYNTHESIS ── */}
            {object?.executiveSynthesis && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
                <SectionLabel label="Executive Synthesis" />
                <p className="text-[12px] text-gray-300 leading-relaxed font-sans bg-white/[0.03] px-5 py-5 border border-white/[0.06] border-l-2 border-l-[#ccff00]">
                  {object.executiveSynthesis}
                  {isLoading && (
                    <span className="inline-block w-1.5 h-[14px] bg-white/40 ml-1 animate-pulse align-middle" />
                  )}
                </p>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
