import React from "react";
import { prisma } from "@/lib/prisma";
import IntelligenceCard from "@/components/IntelligenceCard";

async function getIntelligence(category?: string) {
  try {
    return await (prisma.writing as any).findMany({
      where: {
        status: "APPROVED",
        ...(category && category !== "all" ? { category } : {}),
      },
      orderBy: { date: "desc" },
      take: 12,
    });
  } catch (error) {
    console.error("Failed to fetch intelligence:", error);
    return [];
  }
}

async function getHeartbeats() {
  try {
    return await (prisma as any).agentHeartbeat.findMany({
      orderBy: { timestamp: "desc" },
      take: 5,
    });
  } catch (error) {
    return [];
  }
}

function formatHeartbeatTime(ts: string | Date | null): string {
  if (!ts) return "-- : -- : --";
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return "-- : -- : --";
  }
}

function formatSyncDate(ts: string | Date | null): string {
  if (!ts) return "--:-- UTC";
  try {
    const d = new Date(ts);
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm} UTC`;
  } catch {
    return "--:-- UTC";
  }
}

export default async function IntelligencePage() {
  const reports = await getIntelligence();
  const heartbeats = await getHeartbeats();
  const latestHeartbeat = heartbeats[0] ?? null;
  const nodeCount = heartbeats.length;

  return (
    // Force dark regardless of theme toggle
    <main className="dark min-h-screen bg-black text-white relative flex flex-col items-center">
      {/* Background scanline texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
        }}
      />

      {/* Ambient glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#008751]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[40%] h-[40%] bg-[#ccff00]/3 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ── STICKY APP HEADER ── */}
      <div className="w-full max-w-2xl px-4 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          {/* Back to portfolio / lab */}
          <a
            href="/lab"
            className="flex items-center gap-1.5 p-1.5 -ml-1.5 text-gray-600 hover:text-white transition-colors group"
            title="Back to Lab"
          >
            <div className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-widest hidden sm:block">Lab</span>
          </a>

          <div className="w-px h-5 bg-white/[0.06]" />

          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#008751] to-[#ccff00] p-[1.5px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-xs tracking-tighter text-[#008751]">
              BE
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 font-mono leading-none mb-1 uppercase tracking-widest">
              WELCOME BACK,
            </p>
            <h2 className="text-sm font-black tracking-tighter text-white">
              @eagle_eye
            </h2>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white/[0.03] rounded-full hover:bg-white/[0.07] transition-colors border border-white/[0.05]">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 bg-white/[0.03] rounded-full hover:bg-white/[0.07] transition-colors border border-white/[0.05] relative">
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-1 ring-black animate-pulse" />
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>


      {/* ── MAIN SCROLL CONTENT ── */}
      <div className="w-full max-w-2xl px-3 pt-4 pb-40 space-y-4 z-10 relative">

        {/* ── HERO: MISSION CONTROL TERMINAL ── */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/[0.07] group">
          {/* Hero image */}
          <div className="relative w-full h-[280px] md:h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/mission-control-hero.png"
              alt="Mission Control"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Scanline effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>

          {/* Hero content overlay */}
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
            {/* Terminal blink indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md border border-[#008751]/30 rounded-full">
                <span className="font-mono text-[10px] font-black text-[#008751] uppercase tracking-[0.25em]">
                  {">"} SURVEILLANCE_MODE: ACTIVE{" "}
                  <span className="animate-pulse">█</span>
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>

            <h1 className="text-[42px] md:text-[56px] font-black italic tracking-[-0.04em] text-white leading-none mb-3">
              MISSION<br />CONTROL
            </h1>

            {/* Terminal ticker */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[9px] text-[#008751] font-black uppercase tracking-[0.2em]">
              <span>[ REPORTS: 0{reports.length} ]</span>
              <span>[ NODES: {nodeCount > 0 ? `ACTIVE ×${nodeCount}` : "STANDBY"} ]</span>
              <span>[ LAST SYNC: {formatSyncDate(latestHeartbeat?.timestamp)} ]</span>
            </div>
          </div>
        </div>

        {/* ── HEARTBEAT STATUS TERMINAL ── */}
        <div className="w-full bg-[#0a0a0a] p-6 rounded-[2.5rem] border border-white/[0.05] relative overflow-hidden font-mono">
          {/* Corner accent marks */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#008751]/20" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#008751]/20" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#008751]/20" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#008751]/20" />

          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "300ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "600ms" }} />
            </div>
            <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">
              NEXAL_AGENT_v6.2 // STATUS: OPERATIONAL
            </span>
          </div>

          {/* Terminal output lines */}
          <div className="space-y-2 text-[11px] text-gray-500 mb-5">
            <p>
              <span className="text-[#008751]">$</span>{" "}
              <span className="text-gray-400">ping nexal_core</span>
            </p>
            <p className="pl-4 text-[#ccff00]/80">
              REPLY: {formatHeartbeatTime(latestHeartbeat?.timestamp)} — RTT 12ms
            </p>
            <p>
              <span className="text-[#008751]">$</span>{" "}
              <span className="text-gray-400">status --nodes</span>
            </p>
            <p className="pl-4">
              NODES_ACTIVE:{" "}
              <span className="text-white font-bold">
                {String(nodeCount).padStart(2, "0")}
              </span>{" "}
              / SURVEILLANCE: <span className="text-[#008751]">LIVE</span>
            </p>
            <p>
              <span className="text-[#008751]">$</span>{" "}
              <span className="text-gray-400">
                run health_check <span className="animate-pulse">█</span>
              </span>
            </p>
          </div>

          {/* Action commands */}
          <div className="flex gap-2">
            <button className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.07] rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-colors border border-white/[0.05] text-gray-500 hover:text-[#008751] hover:border-[#008751]/30">
              $ run health_check
            </button>
            <button className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.07] rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] transition-colors border border-white/[0.05] text-gray-500 hover:text-[#ccff00] hover:border-[#ccff00]/20">
              $ exec resync --force
            </button>
          </div>
        </div>

        {/* ── INTELLIGENCE FEED HEADER ── */}
        <div className="flex items-center justify-between px-2 pt-2">
          <h2 className="text-[10px] font-black font-mono uppercase tracking-[0.3em] text-white/20">
            Intelligence Feed
          </h2>
          <div className="h-px flex-1 bg-white/[0.04] mx-4" />
          <span className="text-[9px] font-mono text-[#008751] font-bold">
            0{reports.length} Reports
          </span>
        </div>

        {/* ── FEED CARDS ── */}
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report: any) => (
              <IntelligenceCard
                key={report.id}
                title={report.title}
                excerpt={report.description}
                date={new Date(report.date || "").toISOString()}
                category={(report as any).category}
                status={(report as any).status}
                image={(report as any).image}
                href={`/intelligence/${report.id}`}
              />
            ))
          ) : (
            // Premium empty state
            <div className="py-20 flex flex-col items-center justify-center border border-white/5 bg-[#0a0a0a] rounded-[2.5rem] font-mono">
              <div className="space-y-2 text-center text-[10px] text-gray-600 uppercase tracking-[0.2em]">
                <p className="text-[#008751]">
                  {">"} CONNECTING TO INTELLIGENCE NODES
                  <span className="animate-pulse">█</span>
                </p>
                <p>SYNCING ENCRYPTED FEED...</p>
                <p>NODES_VERIFIED: 00 / PENDING AUTHORIZATION</p>
                <div className="mt-6 flex gap-1 justify-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-4 bg-[#008751]/30 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE BOTTOM NAV (Fixed, above chat bubble) ── */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-[100]">
        <div className="bg-[#0d0d0d]/95 backdrop-blur-2xl border border-white/[0.08] rounded-full p-2 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
          {/* Home */}
          <button className="p-4 text-[#008751]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <div className="w-1 h-1 rounded-full bg-[#ccff00] mx-auto mt-1" />
          </button>
          {/* Search */}
          <button className="p-4 text-gray-600 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* Eagle CTA — always pulsing */}
          <div className="relative -mt-10 group">
            <div className="absolute -inset-3 rounded-full bg-[#008751]/20 animate-ping opacity-75" />
            <div className="absolute -inset-1 rounded-full bg-[#008751]/30 animate-pulse" />
            <button className="relative w-14 h-14 bg-[#008751] rounded-full flex items-center justify-center text-white shadow-[0_0_24px_rgba(0,135,81,0.5)] border-4 border-black active:scale-90 transition-transform duration-150">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </button>
          </div>
          {/* History */}
          <button className="p-4 text-gray-600 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {/* Profile */}
          <button className="p-4 text-gray-600 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
