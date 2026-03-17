import React from "react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

async function getReport(id: string) {
  try {
    return await (prisma.writing as any).findFirst({
      where: { id, status: "APPROVED" },
    });
  } catch (error) {
    return null;
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

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-electric-lime selection:text-black">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-[600px] bg-gradient-to-b from-eagles-green/10 via-transparent to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-electric-lime/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Modern App Header */}
        <div className="px-6 py-10 flex items-center justify-between sticky top-0 z-50 transition-all duration-500">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl border-b border-white/[0.03]" />
          <div className="relative flex items-center justify-between w-full">
            <a
              href="/intelligence"
              className="group flex items-center gap-2 p-2 -ml-2 text-gray-400 hover:text-white transition-all"
            >
              <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white/5 transition-all">
                <svg
                  className="w-4 h-4"
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
              <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                Back
              </span>
            </a>
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-eagles-green mb-1">
                Intelligence Dossier
              </span>
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter opacity-70">
                NODE_NG_{report.id.slice(0, 6)}
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        <article className="px-6 py-16 md:py-24 space-y-16">
          {report.image && (
            <div className="relative w-full aspect-[4/5] md:aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group">
              <Image
                src={report.image}
                alt={report.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
                  Satellite Imagery Verified
                </div>
              </div>
            </div>
          )}

          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-eagles-green uppercase tracking-[0.3em] font-bold">
                {new Date(report.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <div className="h-px flex-1 bg-white/[0.05]" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Live Report
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              {report.title}
            </h1>

            <p className="text-xl md:text-3xl text-gray-400 font-medium leading-tight tracking-tight border-l-4 border-eagles-green/30 pl-8 py-4 bg-white/[0.02] rounded-r-[2rem]">
              {report.description}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div className="text-gray-300 leading-relaxed font-medium space-y-8 text-lg">
            {report.content?.split("\n").map((para: string, i: number) => {
              const trimmed = para.trim();
              if (!trimmed) return <div key={i} className="h-4" />;
              if (trimmed.startsWith("# "))
                return (
                  <h2
                    key={i}
                    className="text-4xl font-black uppercase tracking-tighter text-white pt-8"
                  >
                    {trimmed.replace("# ", "")}
                  </h2>
                );
              if (trimmed.startsWith("## "))
                return (
                  <h3
                    key={i}
                    className="text-2xl font-black uppercase tracking-tighter text-white pt-6"
                  >
                    {trimmed.replace("## ", "")}
                  </h3>
                );
              return (
                <p
                  key={i}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-500"
                >
                  {trimmed}
                </p>
              );
            })}
          </div>

          <footer className="pt-24 pb-60 flex flex-col items-center text-center gap-10 border-t border-white/[0.03]">
            <div className="relative group">
              <div className="absolute inset-0 bg-electric-lime/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-black border border-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-electric-lime"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white">
                Transmission End
              </p>
              <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest leading-relaxed">
                Synthesized by Architect-Agent // Verify at nexalgaming.co{" "}
                <br />
                Data Integrity: 99.9%
              </p>
            </div>

            <a
              href="/intelligence"
              className="group flex items-center gap-4 px-10 py-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                Return to Feed
              </span>
              <svg
                className="w-4 h-4 text-eagles-green group-hover:translate-x-1 transition-transform"
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
            </a>
          </footer>
        </article>
      </div>
    </main>
  );
}
