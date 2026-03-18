"use client";

import React from "react";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  sender: string;
  location: string;
  channel: string;
  status: string;
  riskScore: number;
  tags: string[];
  timestamp: Date | string;
}

export default function TransactionStream({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-eagles-green">
          Live Transaction Intake
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            Stream Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-hidden">
        {transactions.map((trx, idx) => (
          <div
            key={trx.id}
            className="group relative flex items-center justify-between p-5 bg-[#0A0A0A] border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500 hover:translate-x-1"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Risk Indicator Bar */}
            <div
              className={`absolute left-0 top-1/4 bottom-1/4 w-[2px] rounded-full ${
                trx.riskScore > 75 ? "bg-red-500 shadow-[0_0_10px_#ef4444]" : "bg-eagles-green"
              }`}
            />

            <div className="flex items-center gap-6 pl-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">{trx.merchant}</span>
                  <span className="text-[10px] text-gray-600 font-mono tracking-tighter">
                    {trx.id}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                  {trx.sender} • {trx.location}
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-sm font-black text-white">
                {trx.amount.toLocaleString()} <span className="text-[10px] text-gray-600">{trx.currency}</span>
              </div>
              <div
                className={`text-[9px] font-black uppercase tracking-widest ${
                  trx.riskScore > 75 ? "text-red-500" : "text-eagles-green"
                }`}
              >
                Risk: {trx.riskScore}%
              </div>
            </div>

            {/* Tags Overlay (Desktop Only) */}
            <div className="hidden md:flex gap-2 absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              {trx.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[8px] font-black uppercase tracking-widest text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              Awaiting Intake Stream...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
