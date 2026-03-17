import React from "react";
import { prisma } from "@/lib/prisma";
import IntelligenceCard from "@/components/IntelligenceCard";
import Image from "next/image";

async function getIntelligence() {
  try {
    return await (prisma.writing as any).findMany({
      where: { category: "esports-intelligence", status: "APPROVED" },
      orderBy: { date: "desc" },
      take: 6,
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

export default async function IntelligencePage() {
  const reports = await getIntelligence();
  const heartbeats = await getHeartbeats();

  return (
    <main className="min-h-screen bg-black text-white relative flex flex-col items-center">
      {/* Dynamic Background Pattern - Optimized for native feel */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] bg-repeat z-0"
        style={{
          backgroundImage: "url('/eagle-pattern.png')",
          backgroundSize: "300px",
        }}
      />

      {/* Decorative Glows - Subtler for app feel */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-eagles-green/5 blur-[120px] rounded-full pointer-events-none" />

      {/* App Header: Mobile Native Style */}
      <div className="w-full max-w-2xl px-4 pt-6 pb-4 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50 border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-eagles-green to-electric-lime p-[1px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-xs">
              BE
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-medium leading-none mb-1">
              Welcome back,
            </p>
            <h2 className="text-sm font-black tracking-tight">@eagle_eye</h2>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="p-2 bg-white/[0.03] rounded-full relative">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
          <button className="p-2 bg-white/[0.03] rounded-full relative">
            <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-black" />
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl px-3 pt-4 pb-24 space-y-4 z-10">
        {/* Mission Control Hero Section - Making it premium */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 group mb-6">
          <Image
            src="/images/mission-control-hero.png"
            alt="Mission Control Center"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1 bg-eagles-green/20 backdrop-blur-md border border-eagles-green/30 rounded-full">
                <span className="text-[10px] font-black font-mono text-eagles-green uppercase tracking-widest">
                  Live Feed: Active
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
              MISSION CONTROL
            </h1>
            <p className="text-gray-400 text-sm font-medium max-w-md leading-relaxed">
              Global esports surveillance and predictive analytics hub.
              Real-time tactical intelligence for the digital frontier.
            </p>
          </div>
        </div>

        {/* System Status Banner (Fintech Balance Card Style) */}
        <div className="w-full bg-[#111] p-6 rounded-[2.5rem] border border-white/[0.05] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Active Surveillance
            </span>
          </div>

          <p className="text-gray-400 text-xs font-medium">
            Mission Core Status
          </p>
          <div className="flex items-end gap-2 mt-1">
            <h3 className="text-3xl font-black italic tracking-tighter">
              OPERATIONAL
            </h3>
            <span className="text-eagles-green text-[10px] font-mono mb-1.5 font-bold uppercase tracking-wider">
              Ver 6.2
            </span>
          </div>

          <div className="flex gap-2 mt-6">
            <button className="flex-1 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/[0.03]">
              Health Check ⚡️
            </button>
            <button className="flex-1 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/[0.03]">
              Re-Sync 📡
            </button>
          </div>
        </div>

        {/* Intelligence Briefs Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Intelligence Feed
          </h2>
          <div className="h-px flex-1 bg-white/[0.05] mx-4" />
          <span className="text-[9px] font-mono text-eagles-green font-bold text-right">
            0{reports.length} Reports
          </span>
        </div>

        {/* Linear Stack of Cards */}
        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report: any) => (
              <IntelligenceCard
                key={report.id}
                title={report.title}
                excerpt={report.description}
                date={new Date(report.date || "").toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
                category={(report as any).category}
                status={(report as any).status}
                image={(report as any).image}
                href={`/intelligence/${report.id}`}
              />
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] rounded-[2.5rem] backdrop-blur-xl">
              <div className="w-10 h-10 border-2 border-dashed border-eagles-green/30 rounded-full animate-spin mb-4" />
              <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                Syncing Nodes...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Nav (Modern App Feel) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-[100]">
        <div className="bg-[#111]/90 backdrop-blur-2xl border border-white/[0.08] rounded-full p-2 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <button className="p-4 text-white hover:text-electric-lime transition-colors">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </button>
          <button className="p-4 text-gray-500 hover:text-white transition-colors">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="relative -mt-12 group">
            <div className="absolute -inset-4 bg-eagles-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <button className="w-14 h-14 bg-eagles-green rounded-full flex items-center justify-center text-white shadow-lg relative group-active:scale-95 transition-transform border-4 border-black">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </button>
          </div>
          <button className="p-4 text-gray-500 hover:text-white transition-colors">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button className="p-4 text-gray-500 hover:text-white transition-colors">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
