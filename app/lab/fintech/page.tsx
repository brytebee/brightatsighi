import React from "react";
import { prisma } from "@/lib/prisma";
import TransactionStream from "@/components/fintech/TransactionStream";
import RiskMetrics from "@/components/fintech/RiskMetrics";
import ComplianceAlerts from "@/components/fintech/ComplianceAlerts";
import { ComplianceAgent } from "@/lib/core/compliance";
import { revalidatePath } from "next/cache";

async function getFintechData() {
  const [logs, alerts, allLogs] = await Promise.all([
    prisma.agentLog.findMany({
      where: { agentName: "Compliance Agent", action: "TRANSACTION_ANALYSIS" },
      orderBy: { timestamp: "desc" },
      take: 20,
    }),
    prisma.complianceAlert.findMany({
      where: { resolved: false },
      orderBy: { timestamp: "desc" },
      take: 10,
    }),
    prisma.agentLog.findMany({
      where: { agentName: "Compliance Agent" },
    }),
  ]);

  const transactions = logs.map((log: any) => log.metadata);
  const totalTransactions = allLogs.length;
  const avgRisk =
    transactions.length > 0
      ? transactions.reduce(
          (acc: number, curr: any) => acc + (curr.riskScore || 0),
          0
        ) / transactions.length
      : 0;
  const criticalCases = alerts.filter(
    (a: any) => a.severity === "CRITICAL"
  ).length;

  return { transactions, alerts, metrics: { totalTransactions, avgRisk, activeAlerts: alerts.length, criticalCases } };
}

export default async function FintechLabPage() {
  const { transactions, alerts, metrics } = await getFintechData();

  async function simulateBurstAction() {
    "use server";
    const agent = new ComplianceAgent();
    const burstCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < burstCount; i++) {
      const trx = agent.generateTransaction();
      await agent.processTransaction(trx);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    revalidatePath("/lab/fintech");
  }

  return (
    <div className="dark min-h-screen bg-black text-white font-sans selection:bg-[#ccff00]/20">
      {/* Background scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.12) 2px, rgba(255,255,255,0.12) 4px)",
        }}
      />
      {/* Ambient glow */}
      <div className="fixed top-0 left-0 w-[40%] h-[40%] bg-[#008751]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[30%] h-[30%] bg-[#ccff00]/3 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/70 backdrop-blur-2xl px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back to lab */}
            <a
              href="/lab"
              className="flex items-center gap-2 text-gray-600 hover:text-white transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest hidden md:block">Lab</span>
            </a>

            <div className="w-px h-5 bg-white/[0.06]" />

            {/* Identity */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#008751] flex items-center justify-center shadow-[0_0_20px_rgba(0,135,81,0.35)]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-white">
                  Fintech Lab{" "}
                  <span className="text-gray-600 font-normal">v4.0</span>
                </h1>
                <p className="font-mono text-[8px] text-[#008751] uppercase tracking-widest opacity-70">
                  AI Compliance & Fraud Detection Perimeter
                </p>
              </div>
            </div>
          </div>

          {/* Simulate burst */}
          <form action={simulateBurstAction}>
            <button
              type="submit"
              className="group relative flex items-center gap-3 px-5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-[#ccff00]/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover:animate-ping" />
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#ccff00] transition-colors">
                Trigger Burst
              </span>
            </button>
          </form>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-10 pb-32 space-y-10">

        {/* Terminal status bar */}
        <div className="flex items-center gap-3 font-mono text-[9px] text-gray-700 uppercase tracking-[0.2em]">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "300ms" }} />
            <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" style={{ animationDelay: "600ms" }} />
          </div>
          <span>NEXAL_COMPLIANCE_ENGINE // STATUS: OPERATIONAL // MONITORING: LIVE</span>
        </div>

        {/* Risk metrics row */}
        <section>
          <RiskMetrics {...metrics} />
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction stream — 2/3 */}
          <div className="lg:col-span-2">
            <TransactionStream transactions={transactions} />
          </div>

          {/* Alerts + Perimeter Status — 1/3 */}
          <div className="space-y-6">
            <ComplianceAlerts alerts={alerts} />

            {/* Perimeter status terminal */}
            <div className="p-5 bg-[#0a0a0a] border border-white/[0.05] rounded-[1.5rem] font-mono space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-1 rounded-full bg-[#ccff00] animate-pulse" />
                <h4 className="text-[9px] font-black uppercase tracking-[0.35em] text-gray-600">
                  Perimeter Status
                </h4>
              </div>
              {[
                { label: "Heuristic Engine", value: "NOMINAL", color: "#ccff00" },
                { label: "Anomaly Buffer", value: "98.4% CAP", color: "white" },
                { label: "Neural Sync", value: "ACTIVE", color: "#008751" },
                { label: "AML Watchlist", value: "LOADED", color: "#008751" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-black" style={{ color }}>{value}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-white/[0.04]">
                <div className="flex justify-between text-[9px] text-gray-700 mb-1.5">
                  <span>System Load</span>
                  <span>66%</span>
                </div>
                <div className="w-full bg-white/[0.04] h-1 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-[#008751] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
