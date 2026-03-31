import React from "react";
import { prisma } from "@/lib/prisma";
import IntelligenceCard from "@/components/IntelligenceCard";
import IntelligenceTabs from "@/components/IntelligenceTabs";
import { revalidatePath } from "next/cache";
import { SCHEDULE } from "@/lib/notifications/schedule";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intelligence Management | Admin",
};

// ── Data ──────────────────────────────────────────────────────────────────────

async function getPendingIntelligence() {
  return await (prisma.writing as any).findMany({
    where: { status: "PENDING" },
    orderBy: { date: "desc" },
  });
}

// ── Server Actions ────────────────────────────────────────────────────────────

async function approveReport(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  await (prisma.writing as any).update({
    where: { id },
    data: { status: "APPROVED", published: true },
  });
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
  await prisma.writing.delete({ where: { id: formData.get("id") as string } });
  revalidatePath("/admin/intelligence");
}

async function regenerateImage(formData: FormData) {
  "use server";
  const id       = formData.get("id") as string;
  const title    = formData.get("title") as string;
  const category = formData.get("category") as string;
  const seed     = Math.floor(Math.random() * 500);
  const base     =
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : (process.env.NEXTAUTH_URL ?? "http://localhost:3000");

  await (prisma.writing as any).update({
    where: { id },
    data: {
      image: `${base}/api/og?title=${encodeURIComponent(title)}&category=${encodeURIComponent(category ?? "intel")}&seed=${seed}`,
    },
  });
  revalidatePath("/admin/intelligence");
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function IntelligenceAdminPage() {
  const pendingReports = await getPendingIntelligence();

  const today = new Date().toISOString().split("T")[0];

  const todayItems  = SCHEDULE.filter((a) => a.date === today);
  const futureItems = SCHEDULE.filter((a) => a.date > today);
  const pastItems   = SCHEDULE.filter((a) => a.date < today).reverse(); // most recent first

  return (
    <div className="bg-dark-pitch min-h-screen text-white relative flex flex-col items-center">
      {/* Ambient */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-eagles-green/5 blur-[150px] rounded-full pointer-events-none" />

      {/* ── Header ── */}
      <header className="w-full max-w-6xl px-6 pt-16 pb-10 md:px-12 relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-[10px] font-mono text-yellow-500 tracking-[0.3em] uppercase font-bold">
                MISSION_CONTROL // ACTIVE
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] italic">
              Mission <br />
              <span className="text-gray-500">Control</span>
            </h1>
          </div>

          <a
            href="/admin/intelligence/new"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-eagles-green/30 bg-eagles-green/10 text-eagles-green hover:bg-eagles-green/20 hover:border-eagles-green/50 transition-all font-mono text-[10px] uppercase font-black tracking-widest self-start"
          >
            + Inject Intelligence
          </a>
        </div>
      </header>

      <div className="w-full h-px bg-white/5 relative z-10" />

      {/* ── Tabs ── */}
      <main className="w-full max-w-6xl px-4 md:px-12 py-10 pb-40 relative z-10">
        <IntelligenceTabs
          pendingReports={pendingReports}
          todayItems={todayItems}
          futureItems={futureItems}
          pastItems={pastItems}
          approveReport={approveReport}
          deleteReport={deleteReport}
          regenerateImage={regenerateImage}
          IntelligenceCard={IntelligenceCard}
        />
      </main>

      {/* ── Footer ── */}
      <footer className="w-full max-w-6xl px-12 py-12 border-t border-white/5 relative z-10 flex justify-between items-center opacity-40">
        <a
          href="/admin"
          className="group text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors flex items-center gap-3"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Command Base
        </a>
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
          ID_SECURE // AUTH_VERIFIED
        </span>
      </footer>
    </div>
  );
}
