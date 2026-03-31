"use client";

import { experimental_useObject } from "@ai-sdk/react";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

// The exact same schema as the backend
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

type ExtractedData = z.infer<typeof schema>;

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
    // Auto scroll bottom when object changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [object]);

  const handleRun = () => {
    setHasStarted(true);
    submit({ documentType, content: documentText });
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case "CRITICAL": return "text-red-500";
      case "HIGH": return "text-orange-500";
      case "MEDIUM": return "text-yellow-500";
      case "LOW": return "text-[#008751]";
      default: return "text-gray-500";
    }
  };

  if (!hasStarted) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-black border-l border-white/5 relative group">
        <div className="absolute inset-0 bg-linear-to-b from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">
          Pipeline Ready
        </h3>
        <p className="text-gray-500 text-sm font-mono text-center max-w-sm mb-8">
          Awaiting initialization. Edge function will invoke model 'gemini-1.5-flash' and stream structured extraction to the client.
        </p>
        <button
          onClick={handleRun}
          className="px-8 py-3 bg-[#ccff00] text-black font-black uppercase tracking-widest text-xs hover:bg-[#aacc00] transition-colors rounded-none border-b-2 border-r-2 border-black active:translate-y-px active:translate-x-px"
        >
          Initialize Extraction
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#050505] border-l border-white/5 font-mono text-sm relative overflow-hidden">
      {/* Header bar */}
      <div className="shrink-0 h-14 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className={`w-2 h-2 rounded-full ${isLoading ? "bg-red-500 animate-pulse" : "bg-[#008751]"}`} />
            <div className="w-2 h-2 rounded-full bg-white/20" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            {isLoading ? "EXTRACTING_STREAM..." : "STREAM_COMPLETE"}
          </span>
        </div>
        <div className="text-[10px] text-[#ccff00] uppercase tracking-widest bg-[#ccff00]/10 px-2 py-1">
          gemini-1.5-flash
        </div>
      </div>

      {/* Stream Terminal Output */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar relative z-10"
      >
        {/* Error Handling */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/5 p-4 rounded text-red-500">
            <p className="font-bold flex items-center gap-2">
               <span className="animate-pulse">⚠️</span> Pipeline Terminated 
            </p>
            <p className="mt-2 text-xs opacity-80">{error.message}</p>
            {error.message.includes("API_KEY") && (
              <p className="mt-2 text-xs opacity-100 font-bold bg-white/10 p-2 text-white">
                Ensure GOOGLE_GENERATIVE_AI_API_KEY is defined in .env
              </p>
            )}
          </div>
        )}

        {/* Object Visualization */}
        {object ? (
          <div className="space-y-10">
            {/* Metadata Section */}
            {(object?.metadata?.primaryTopic || object?.metadata?.classificationLevel) && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h4 className="text-[10px] text-gray-600 uppercase tracking-[0.3em] flex items-center gap-4">
                  [1] Context Metadata <span className="h-px flex-1 bg-white/5" />
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 border border-white/10">
                     <p className="text-[9px] text-gray-500 uppercase mb-2">Classification</p>
                     <p className={`font-black ${object.metadata?.classificationLevel === 'PUBLIC' ? 'text-[#008751]' : 'text-[#ccff00]'}`}>
                       {object.metadata?.classificationLevel || "ANALYZING..."}
                     </p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10">
                     <p className="text-[9px] text-gray-500 uppercase mb-2">Primary Topic</p>
                     <p className="font-medium text-white truncate">
                       {object.metadata?.primaryTopic || "STREAMING..."}
                     </p>
                  </div>
                </div>
              </div>
            )}

            {/* Risk Assessment Section */}
            {(object?.riskAssessment?.riskLevel) && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h4 className="text-[10px] text-gray-600 uppercase tracking-[0.3em] flex items-center gap-4">
                  [2] Heuristic Risk Vector <span className="h-px flex-1 bg-white/5" />
                </h4>
                <div className="p-5 border border-white/10 bg-black/50 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">Threat Level:</span>
                    <span className={`font-black uppercase tracking-widest text-lg ${getRiskColor(object.riskAssessment.riskLevel)}`}>
                      {object.riskAssessment.riskLevel}
                    </span>
                  </div>
                  {object.riskAssessment.keyRiskFactors && object.riskAssessment.keyRiskFactors.length > 0 && (
                     <ul className="space-y-2">
                       {object.riskAssessment.keyRiskFactors.map((rf: any, i: number) => (
                         <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                           <span className="text-[#ccff00] mt-0.5">↳</span> {rf}
                         </li>
                       ))}
                     </ul>
                  )}
                </div>
              </div>
            )}

            {/* Entities Section */}
            {object?.entities && object?.entities.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h4 className="text-[10px] text-gray-600 uppercase tracking-[0.3em] flex items-center gap-4">
                  [3] Entity Recognition <span className="h-px flex-1 bg-white/5" />
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {object.entities.map((ent: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1 p-3 bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{ent.name || "..."}</span>
                        <span className="text-[9px] text-gray-500 uppercase">{ent.type || "..."}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 mt-2">
                         <div 
                           className="bg-[#008751] h-full" 
                           style={{ width: `${ent.relevanceScore || 0}%` }}
                         />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synthesis Section */}
            {object?.executiveSynthesis && (
              <div className="space-y-4 pb-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h4 className="text-[10px] text-gray-600 uppercase tracking-[0.3em] flex items-center gap-4">
                  [4] Executive Synthesis <span className="h-px flex-1 bg-white/5" />
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed font-sans bg-white/5 p-6 border-l-2 border-[#ccff00]">
                  {object.executiveSynthesis}
                  {isLoading && <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />}
                </p>
              </div>
            )}
            
          </div>
        ) : (
          !error && (
            <div className="flex items-center gap-3 text-gray-500">
               <span className="animate-spin text-[#ccff00]">⧗</span> Opening stream connection...
            </div>
          )
        )}
      </div>

      {/* Grid overlay for aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      />
    </div>
  );
}
