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
  const avgRisk = transactions.length > 0 
    ? transactions.reduce((acc: number, curr: any) => acc + (curr.riskScore || 0), 0) / transactions.length 
    : 0;
  
  const criticalCases = alerts.filter((a: any) => a.severity === "CRITICAL").length;

  return {
    transactions,
    alerts,
    metrics: {
      totalTransactions,
      avgRisk,
      activeAlerts: alerts.length,
      criticalCases,
    },
  };
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
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    revalidatePath("/lab/fintech");
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-electric-lime/20">
      {/* HUD Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-3xl px-6 md:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-eagles-green flex items-center justify-center shadow-[0_0_20px_rgba(0,135,81,0.3)]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="space-y-1">
              <h1 className="text-[11px] font-black uppercase tracking-[0.5em] text-white">
                Fintech Lab <span className="text-gray-600">v4.0</span>
              </h1>
              <p className="text-[9px] font-mono text-eagles-green uppercase tracking-widest opacity-60">
                Compliance & Fraud Detection Perimeter
              </p>
            </div>
          </div>

          <form action={simulateBurstAction}>
            <button
              type="submit"
              className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-electric-lime/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-electric-lime group-hover:animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white">
                   Trigger Simulation Burst
                </span>
              </div>
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-32 space-y-16">
        {/* Core Metrics */}
        <section>
          <RiskMetrics {...metrics} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Ticker Stream */}
          <div className="lg:col-span-2">
            <TransactionStream transactions={transactions} />
          </div>

          {/* Active Alerts Sidebar */}
          <div className="space-y-12">
            <ComplianceAlerts alerts={alerts} />
            
            {/* System Status Detail */}
            <div className="p-8 bg-white/1 border border-white/5 rounded-[2.5rem] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                Perimeter Status
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500">Heuristic Engine</span>
                  <span className="text-electric-lime font-mono">NOMINAL</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500">Anomaly Buffer</span>
                  <span className="text-white font-mono">98.4% CAP</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500">Neural Sync</span>
                  <span className="text-eagles-green font-mono">ACTIVE</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-eagles-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
