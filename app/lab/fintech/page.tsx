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
    <div className="dark min-h-screen bg-[#050505] text-white font-sans selection:bg-[#ccff00]/20 selection:text-[#ccff00] overflow-x-hidden relative">
      {/* Background slow-breathing radial gradients (Glassmorphism Environment) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 15% 30%, rgba(0,230,118,0.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 70%, rgba(204,255,0,0.06) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(0,230,118,0.04) 0%, transparent 70%)
          `,
        }}
      />

      {/* Grid scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── STICKY COMMAND HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/40 backdrop-blur-3xl px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Back to lab */}
            <a
              href="/lab"
              className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:border-white/[0.2] transition-colors shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest hidden sm:block">Exit</span>
            </a>

            <div className="w-px h-6 bg-white/[0.1] shadow-[0_0_10px_rgba(255,255,255,0.2)]" />

            {/* Identity */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00e676] blur-[10px] opacity-40 animate-pulse" />
                <div className="relative w-10 h-10 rounded-xl bg-black border border-[#00e676]/30 flex items-center justify-center shadow-inner">
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00e676] animate-ping" />
                  <svg className="w-5 h-5 text-[#00e676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="font-mono text-[12px] font-black uppercase tracking-[0.4em] text-white">
                  Fintech Lab <span className="text-[#00e676]">v4.0</span>
                </h1>
                <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                  Nexus Perimeter Control
                </p>
              </div>
            </div>
          </div>

          {/* Simulate burst - Tactical Switch */}
          <form action={simulateBurstAction}>
            <button
              type="submit"
              className="group relative overflow-hidden flex items-center gap-3 px-6 py-3 bg-black border border-[#ccff00]/30 rounded-lg hover:border-[#ccff00] transition-all duration-500 shadow-[0_0_20px_rgba(204,255,0,0.1)] hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ccff00]/0 via-[#ccff00]/10 to-[#ccff00]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <div className="relative w-2 h-2 rounded-full border border-[rgba(204,255,0,0.5)] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#ccff00] group-hover:scale-150 transition-transform" />
              </div>
              <span className="relative font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#ccff00]/80 group-hover:text-[#ccff00] transition-colors">
                Trigger Burst
              </span>
            </button>
          </form>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-10 pb-32 space-y-12">

        {/* Terminal status bar */}
        <div className="flex items-center gap-4 py-3 px-5 rounded-lg bg-white/[0.01] border border-white/[0.03] backdrop-blur-md font-mono text-[10px] text-gray-500 uppercase tracking-[0.25em]">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#00e676] animate-ping" />
          </div>
          <span className="text-white/80 font-bold">SYS.CTL</span>
          <span className="text-gray-600">/</span>
          <span>ROUTING: NOMINAL</span>
          <span className="text-gray-600">/</span>
          <span className="text-[#ccff00]">DEFENSE GRID: ACTIVE</span>
        </div>

        {/* Risk metrics row */}
        <section className="animate-[fadeInUp_0.6s_ease-out]">
          <RiskMetrics {...metrics} />
        </section>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction stream — 2/3 */}
          <div className="lg:col-span-2 animate-[fadeInUp_0.8s_ease-out]">
            <TransactionStream transactions={transactions} />
          </div>

          {/* Alerts + Perimeter Status — 1/3 */}
          <div className="space-y-8 animate-[fadeInUp_1s_ease-out]">
            <ComplianceAlerts alerts={alerts} />

            {/* Monolithic Perimeter Status Terminal */}
            <div className="relative p-6 bg-black/60 backdrop-blur-3xl border border-white/[0.05] rounded-2xl font-mono overflow-hidden group hover:border-white/[0.15] transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>

              <div className="flex items-center gap-3 mb-6 border-b border-white/[0.05] pb-4">
                <div className="w-2 h-2 bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-white">
                  Core Status
                </h4>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Heuristic Engine", value: "NOMINAL", color: "#ccff00" },
                  { label: "Anomaly Buffer", value: "98.4% CAP", color: "white" },
                  { label: "Neural Sync", value: "ACTIVE", color: "#00e676" },
                  { label: "AML Watchlist", value: "LOADED", color: "#00e676" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between items-center text-[10px] uppercase tracking-widest border-b border-white/[0.02] pb-2">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-black" style={{ color, textShadow: `0 0 10px ${color}40` }}>{value}</span>
                  </div>
                ))}
                
                <div className="pt-4">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                    <span>System Load</span>
                    <span className="text-white font-black">66%</span>
                  </div>
                  <div className="w-full bg-black border border-white/[0.1] h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full rounded-full w-2/3 relative overflow-hidden"
                      style={{ background: "#00e676", boxShadow: "0 0 10px #00e676" }}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripes_1s_linear_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
      `}} />
    </div>
  );
}
