import React from "react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ReadingProgressBar } from "@/components/DossierProgress";

async function getReport(id: string) {
  try {
    return await (prisma.writing as any).findFirst({
      where: { id, status: "APPROVED" },
    });
  } catch (error) {
    return null;
  }
}

function getThreatLevel(category: string): {
  label: string;
  color: string;
} {
  if (category?.includes("intelligence"))
    return { label: "HIGH", color: "#008751" };
  if (category?.includes("analysis"))
    return { label: "MODERATE", color: "#ccff00" };
  return { label: "STANDARD", color: "#ffffff" };
}

function formatDossierDate(raw: string | Date): string {
  try {
    const d = new Date(raw);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).toUpperCase();
  } catch {
    return "CLASSIFIED";
  }
}

export default async function PublicIntelligenceDossierPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    redirect("/intelligence");
  }

  const threat = getThreatLevel((report as any).category ?? "");
  const nodeId = `NODE_NG_${report.id.slice(0, 6).toUpperCase()}`;
  const paragraphs: string[] = (report.content ?? "")
    .split("\n")
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    // Force dark
    <main className="dark min-h-screen bg-black text-white relative selection:bg-[#ccff00] selection:text-black">
      {/* Reading progress bar (client component) */}
      <ReadingProgressBar />

      {/* Background ambience */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#008751]/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#ccff00]/4 blur-[140px] pointer-events-none rounded-full z-0" />

      {/* Background scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* ── STICKY HEADER ── */}
        <div className="px-6 py-8 flex items-center justify-between sticky top-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl border-b border-white/[0.04]" />
          <div className="relative flex items-center justify-between w-full">
            <a
              href="/intelligence"
              className="group flex items-center gap-2 p-2 -ml-2 text-gray-500 hover:text-white transition-all"
            >
              <div className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center group-hover:bg-white/5 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="text-[10px] font-black font-mono uppercase tracking-widest hidden md:block">
                Feed
              </span>
            </a>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black font-mono uppercase tracking-[0.4em] text-[#008751] mb-1">
                Intelligence Dossier
              </span>
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-tighter opacity-70">
                {nodeId}
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        <article className="px-6 pt-8 pb-40 space-y-16">
          {/* ── HERO IMAGE ── */}
          {report.image && (
            <div className="relative w-full aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={report.image}
                alt={report.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Scanlines on image */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
                Satellite Imagery Verified
              </div>
            </div>
          )}

          {/* ── DOSSIER METADATA TABLE ── */}
          <div className="font-mono border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-[9px] text-gray-600 uppercase tracking-[0.3em]">
              [ DOCUMENT METADATA — RESTRICTED ]
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.05]">
              {[
                { label: "NODE ID", value: nodeId },
                { label: "DATE CLASSIFIED", value: formatDossierDate(report.date) },
                { label: "THREAT LVL", value: threat.label, color: threat.color },
                { label: "CATEGORY", value: ((report as any).category ?? "UNKNOWN").toUpperCase().replace(/-/g, "_") },
              ].map(({ label, value, color }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[8px] text-gray-600 uppercase tracking-[0.25em] mb-1">{label}</p>
                  <p className="text-[11px] font-black text-white" style={color ? { color } : {}}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── HEADER: DATE + TITLE ── */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-[#008751] uppercase tracking-[0.3em] font-bold">
                {new Date(report.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <div className="h-px flex-1 bg-white/[0.05]" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                <span className="font-mono text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Live Report
                </span>
              </div>
            </div>

            <h1 className="text-[52px] md:text-[80px] font-black italic uppercase tracking-[-0.04em] leading-[0.9] text-white">
              {report.title}
            </h1>

            {/* Excerpt / pull quote */}
            <div className="border-l-4 border-[#008751]/40 pl-6 py-3 bg-white/[0.02] rounded-r-[1.5rem]">
              <p className="text-[18px] md:text-[22px] text-gray-400 font-medium leading-tight tracking-tight">
                {report.description}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* ── ARTICLE BODY ── */}
          <div 
            className="w-full text-base md:text-lg font-medium [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-6 last:[&_p]:mb-0 [&_a]:text-[#ccff00] [&_a]:no-underline hover:[&_a]:underline [&_hr]:border-white/10 [&_hr]:my-10 [&_strong]:text-white [&_img]:rounded-2xl [&_img]:my-8 [&_img]:border [&_img]:border-white/5 shadow-2xl overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: report.content || "<p class='text-gray-600 italic'>Signal lost. No intelligence data recovered.</p>" }}
          />

          {/* ── TRANSMISSION FOOTER ── */}
          <footer className="pt-20 pb-16 flex flex-col items-center text-center gap-8 border-t border-white/[0.05]">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.5em] text-white/40">
                [ END OF TRANSMISSION ]
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-[#ccff00]/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1 font-mono">
              <p className="text-[9px] text-gray-600 uppercase tracking-[0.4em] leading-relaxed">
                Synthesized by Architect-Agent // Verify at nexalgaming.co
                <br />
                Data Integrity: 99.9% // Node: {nodeId}
              </p>
            </div>

            <a
              href="/intelligence"
              className="group flex items-center gap-4 px-8 py-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#008751]/30 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 font-mono"
            >
              <svg
                className="w-4 h-4 text-[#008751] group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">
                Return to Feed
              </span>
            </a>
          </footer>
        </article>
      </div>
    </main>
  );
}
