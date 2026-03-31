import React from "react";
import { prisma } from "@/lib/prisma";
import IntelligenceCard from "@/components/IntelligenceCard";
import { revalidatePath } from "next/cache";

async function getPendingIntelligence() {
  return await (prisma.writing as any).findMany({
    where: { status: "PENDING" },
    orderBy: { date: "desc" },
  });
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence Management | Admin",
};

export default async function IntelligenceAdminPage() {
  const pendingReports = await getPendingIntelligence();

  async function approveReport(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await (prisma.writing as any).update({
      where: { id },
      data: { status: "APPROVED", published: true },
    });

    // Log the approval
    await (prisma as any).agentLog.create({
      data: {
        agentName: "Human-Director",
        action: "APPROVE",
        status: "SUCCESS",
        message: `Report ${id} approved and published.`,
      },
    });

    revalidatePath("/admin/intelligence");
    revalidatePath("/intelligence");
  }

  async function deleteReport(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.writing.delete({ where: { id } });
    revalidatePath("/admin/intelligence");
  }

  async function regenerateImage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;

    console.log(`\n🔄 [REGEN] Starting for id=${id} title="${title}"`);

    const seed = Math.floor(Math.random() * 500);
    // Use self-hosted /api/og endpoint — zero auth, instant, deterministic
    // Vercel populates VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL automatically.
    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : (process.env.NEXTAUTH_URL ?? "http://localhost:3000");

    const newUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category ?? "intel")}&seed=${seed}`;

    console.log(`🔗 [REGEN] Saving OG URL: ${newUrl}`);

    await (prisma.writing as any).update({
      where: { id },
      data: { image: newUrl },
    });
    console.log(`✅ [REGEN] DB updated. Revalidating...`);
    revalidatePath("/admin/intelligence");
    console.log(`✅ [REGEN] Done.\n`);
  }

  return (
    <div className="bg-dark-pitch min-h-screen text-white relative flex flex-col items-center">
      {/* Background Ambience */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-eagles-green/5 blur-[150px] rounded-full pointer-events-none" />

      <header className="w-full max-w-6xl px-6 pt-16 pb-12 md:px-12 relative z-10">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              <span className="text-[10px] font-mono text-yellow-500 tracking-[0.3em] uppercase font-bold">
                SURVEILLANCE_QUEUE // ACTIVE_DRAFTS
              </span>
            </div>
            
            <a
              href="/admin/intelligence/new"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#008751]/30 bg-[#008751]/10 text-[#008751] hover:bg-[#008751]/20 hover:border-[#008751]/50 transition-all font-mono text-[10px] uppercase font-black tracking-widest shadow-[0_0_15px_rgba(0,135,81,0.15)] hover:shadow-[0_0_30px_rgba(0,135,81,0.3)] hover:-translate-y-0.5"
            >
              + Inject Intelligence
            </a>
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic">
            Mission <br />
            <span className="text-gray-500">Control</span>
          </h1>

          <p className="text-gray-400 text-sm font-medium max-w-md border-l border-white/10 pl-6 mt-6">
            Direct oversight of autonomous agent intelligence. Review and
            authorize tactical reports for broadcast.
          </p>
        </div>
      </header>

      <div className="w-full h-px bg-white/[0.05] relative z-10" />

      <main className="w-full max-w-6xl px-4 md:px-12 py-12 pb-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {pendingReports.length > 0 ? (
            pendingReports.map((report: any) => (
              <div key={report.id} className="relative group flex flex-col">
                <div className="flex-1">
                  <IntelligenceCard
                    title={report.title}
                    excerpt={report.description}
                    date={new Date(report.date || "").toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                    category={(report as any).category}
                    status={(report as any).status}
                    image={(report as any).image}
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={`/admin/intelligence/${report.id}`}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all rounded-2xl flex items-center justify-center flex-1"
                  >
                    Open Dossier
                  </a>

                  <form action={regenerateImage}>
                    <input type="hidden" name="id" value={report.id} />
                    <input type="hidden" name="title" value={report.title} />
                    <input type="hidden" name="category" value={(report as any).category ?? "intel"} />
                    <button 
                      title="Regenerate Image"
                      className="p-4 bg-white/5 border border-white/10 text-[#ccff00] hover:bg-white/10 hover:border-[#ccff00]/50 transition-all rounded-2xl flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </form>

                  <form
                    action={approveReport}
                    className="flex-[2] min-w-[200px]"
                  >
                    <input type="hidden" name="id" value={report.id} />
                    <button className="w-full py-4 bg-gradient-to-r from-eagles-green to-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_10px_30px_rgba(0,135,81,0.2)] hover:shadow-[0_15px_45px_rgba(0,135,81,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                      Authorize Release
                    </button>
                  </form>

                  <form action={deleteReport}>
                    <input type="hidden" name="id" value={report.id} />
                    <button className="p-4 bg-red-950/20 text-red-500 hover:bg-red-950/40 transition-colors rounded-2xl border border-red-500/10">
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[3rem] bg-white/[0.02]">
              <p className="text-gray-600 font-mono text-sm uppercase tracking-[0.4em] mb-4">
                No active threats found
              </p>
              <p className="text-[10px] text-eagles-green/60 font-black uppercase tracking-widest animate-pulse">
                System scanning for new data...
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full max-w-6xl px-12 py-12 border-t border-white/[0.05] relative z-10 flex justify-between items-center opacity-40">
        <a
          href="/admin"
          className="group text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors flex items-center gap-3"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Command Base
        </a>
        <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
          ID_SECURE // AUTH_VERIFIED
        </div>
      </footer>
    </div>
  );
}
