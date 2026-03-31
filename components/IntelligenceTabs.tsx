"use client";

import { useState } from "react";
import type { ScheduledAction } from "@/lib/notifications/schedule";

// ── Copy Button ───────────────────────────────────────────────────────────────
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] transition-all border rounded-lg flex items-center gap-1.5 shrink-0 ${
        copied
          ? "bg-eagles-green/20 border-eagles-green/40 text-eagles-green"
          : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:border-white/20"
      }`}
    >
      {copied ? "✓ Copied" : `Copy ${label}`}
    </button>
  );
}

// ── Schedule Card (no archive actions — date is the source of truth) ───────────
function ScheduleCard({ action }: { action: ScheduledAction }) {
  const [open, setOpen] = useState(true);
  const hasContent = !!(action.xPost || action.linkedinPost);

  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-white truncate">{action.title}</p>
          <p className="text-[10px] font-mono text-gray-600 mt-0.5">{action.date} · Week {action.week}</p>
        </div>
        <svg
          className={`w-4 h-4 text-gray-600 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
          {/* X Post */}
          {action.xPost && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">X / Twitter</p>
                <CopyButton text={action.xPost} label="X post" />
              </div>
              <pre className="text-[12px] text-gray-300 font-mono whitespace-pre-wrap leading-relaxed bg-black/50 border border-white/[0.06] rounded-xl p-4 select-all cursor-text">
                {action.xPost}
              </pre>
            </div>
          )}

          {/* LinkedIn */}
          {action.linkedinPost && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">LinkedIn</p>
                <CopyButton text={action.linkedinPost} label="LinkedIn" />
              </div>
              <pre className="text-[12px] text-gray-300 font-mono whitespace-pre-wrap leading-relaxed bg-black/50 border border-white/[0.06] rounded-xl p-4 select-all cursor-text">
                {action.linkedinPost}
              </pre>
            </div>
          )}

          {/* Hashtags */}
          {action.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Hashtags</p>
                <CopyButton text={action.tags.join(" ")} label="hashtags" />
              </div>
              <p className="text-[12px] text-electric-lime font-mono">{action.tags.join(" ")}</p>
            </div>
          )}

          {/* Manual Steps */}
          {action.manualSteps.length > 0 && (
            <div className="space-y-2">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-yellow-500/80">Manual Steps</p>
              <ol className="space-y-2 pl-4 border-l border-yellow-500/20">
                {action.manualSteps.map((step, i) => (
                  <li key={i} className="text-[12px] text-gray-400 leading-relaxed list-decimal list-inside">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* URL */}
          <div className="flex items-center gap-3">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600 shrink-0">URL</p>
            <a
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-eagles-green font-mono hover:underline truncate"
            >
              {action.url}
            </a>
          </div>

          {!hasContent && (
            <p className="text-[11px] text-gray-600 italic font-mono">
              No post copy for this week — see manual steps above.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ message, sub }: { message: string; sub?: string }) {
  return (
    <div className="py-32 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
      <p className="text-gray-600 font-mono text-sm uppercase tracking-[0.4em] mb-2">{message}</p>
      {sub && <p className="text-[10px] text-eagles-green/60 font-black uppercase tracking-widest animate-pulse">{sub}</p>}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Report = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  status: string;
  image: string;
};

type TabId = "eagle-eye" | "mission";
type MissionSubtab = "today" | "future" | "past";

// ── Main Client Component ─────────────────────────────────────────────────────
export default function IntelligenceTabs({
  pendingReports,
  todayItems,
  futureItems,
  pastItems,
  approveReport,
  deleteReport,
  regenerateImage,
  IntelligenceCard,
}: {
  pendingReports: Report[];
  todayItems: ScheduledAction[];
  futureItems: ScheduledAction[];
  pastItems: ScheduledAction[];
  approveReport: (fd: FormData) => Promise<void>;
  deleteReport: (fd: FormData) => Promise<void>;
  regenerateImage: (fd: FormData) => Promise<void>;
  IntelligenceCard: React.ComponentType<{
    title: string;
    excerpt: string;
    date: string;
    category: string;
    status: string;
    image: string;
  }>;
}) {
  const [activeTab, setActiveTab] = useState<TabId>(
    todayItems.length > 0 ? "mission" : "eagle-eye"
  );
  const [missionSub, setMissionSub] = useState<MissionSubtab>("today");

  const hasTodayItem = todayItems.length > 0;
  const tabs: { id: TabId; label: string; count?: number; pulse?: boolean }[] = [
    {
      id: "eagle-eye",
      label: "Eagle-Eye",
      count: pendingReports.length,
      pulse: pendingReports.length > 0,
    },
    {
      id: "mission",
      label: "Mission",
      pulse: hasTodayItem,
    },
  ];

  const missionSubtabs: { id: MissionSubtab; label: string; count: number }[] = [
    { id: "today", label: "Today", count: todayItems.length },
    { id: "future", label: "Future", count: futureItems.length },
    { id: "past", label: "Past", count: pastItems.length },
  ];

  return (
    <div className="space-y-8">
      {/* ── Primary Tab Bar ── */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all border-b-2 -mb-px ${
                isActive
                  ? "border-electric-lime text-white"
                  : "border-transparent text-gray-600 hover:text-gray-400"
              }`}
            >
              {tab.pulse && (
                <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse shrink-0" />
              )}
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-electric-lime text-black"
                    : "bg-white/10 text-gray-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Eagle-Eye Panel ── */}
      {activeTab === "eagle-eye" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {pendingReports.length > 0 ? (
            pendingReports.map((report) => (
              <div key={report.id} className="relative group flex flex-col">
                <div className="flex-1">
                  <IntelligenceCard
                    title={report.title}
                    excerpt={report.description}
                    date={new Date(report.date || "").toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                    category={report.category}
                    status={report.status}
                    image={report.image}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`/admin/intelligence/${report.id}`}
                    className="px-6 py-3.5 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all rounded-2xl flex items-center justify-center flex-1"
                  >
                    Open Dossier
                  </a>

                  <form action={regenerateImage}>
                    <input type="hidden" name="id" value={report.id} />
                    <input type="hidden" name="title" value={report.title} />
                    <input type="hidden" name="category" value={report.category ?? "intel"} />
                    <button
                      title="Regenerate Image"
                      className="p-3.5 bg-white/5 border border-white/10 text-electric-lime hover:bg-white/10 hover:border-electric-lime/30 transition-all rounded-2xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </form>

                  <form action={approveReport} className="flex-[2] min-w-[160px]">
                    <input type="hidden" name="id" value={report.id} />
                    <button className="w-full py-3.5 bg-gradient-to-r from-eagles-green to-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_10px_30px_rgba(0,135,81,0.2)] hover:shadow-[0_15px_45px_rgba(0,135,81,0.4)] hover:-translate-y-0.5 transition-all">
                      Authorize Release
                    </button>
                  </form>

                  <form action={deleteReport}>
                    <input type="hidden" name="id" value={report.id} />
                    <button className="p-3.5 bg-red-950/20 text-red-500 hover:bg-red-950/40 transition-colors rounded-2xl border border-red-500/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <EmptyState
                message="No active drafts"
                sub="Eagle-Eye populates this at 07:30 UTC"
              />
            </div>
          )}
        </div>
      )}

      {/* ── Mission Panel ── */}
      {activeTab === "mission" && (
        <div className="space-y-6">
          {/* Subtab bar */}
          <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
            {missionSubtabs.map((sub) => {
              const isActive = missionSub === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setMissionSub(sub.id)}
                  className={`flex items-center gap-2 px-5 py-2 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg transition-all ${
                    isActive
                      ? sub.id === "today" && hasTodayItem
                        ? "bg-electric-lime text-black"
                        : "bg-white/10 text-white"
                      : "text-gray-600 hover:text-gray-400"
                  }`}
                >
                  {sub.id === "today" && hasTodayItem && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
                  )}
                  {sub.label}
                  {sub.count > 0 && (
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? sub.id === "today" && hasTodayItem
                          ? "bg-black/20 text-black"
                          : "bg-white/20 text-white"
                        : "bg-white/5 text-gray-600"
                    }`}>
                      {sub.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtab content */}
          <div className="space-y-4">
            {missionSub === "today" && (
              todayItems.length > 0 ? (
                todayItems.map((a) => <ScheduleCard key={a.date} action={a} />)
              ) : (
                <EmptyState message="No mission scheduled today" />
              )
            )}

            {missionSub === "future" && (
              futureItems.length > 0 ? (
                futureItems.map((a) => <ScheduleCard key={a.date} action={a} />)
              ) : (
                <EmptyState message="No upcoming missions" />
              )
            )}

            {missionSub === "past" && (
              pastItems.length > 0 ? (
                <div className="space-y-4 opacity-70">
                  {pastItems.map((a) => <ScheduleCard key={a.date} action={a} />)}
                </div>
              ) : (
                <EmptyState message="No past missions yet" />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
