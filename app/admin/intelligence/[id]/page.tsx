import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BroadcasterDispatcher } from "@/lib/core/broadcaster";
import CopySnippet from "@/components/CopySnippet";

async function getReport(id: string) {
  try {
    return await (prisma.writing as any).findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

export default async function IntelligenceDossierPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    redirect("/admin/intelligence");
  }

  async function updateReportAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    await (prisma.writing as any).update({
      where: { id },
      data: {
        title,
        description,
        content,
      },
    });

    revalidatePath(`/admin/intelligence/${id}`);
    revalidatePath("/admin/intelligence");
    revalidatePath("/intelligence");
  }

  async function generateSocialAssetsAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const report = await getReport(id);

    if (!report) return;

    const dispatcher = new BroadcasterDispatcher();
    const payload = {
      title: report.title,
      description: report.description,
      content: report.content || "",
      image: report.image || "",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/intelligence/${report.id}`,
    };

    const results = await dispatcher.broadcastAll(payload);

    await (prisma.writing as any).update({
      where: { id },
      data: {
        broadcastLogs: results,
      },
    });

    revalidatePath(`/admin/intelligence/${id}`);
  }

  async function approveReportAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await (prisma.writing as any).update({
      where: { id },
      data: { status: "APPROVED" },
    });

    revalidatePath("/admin/intelligence");
    revalidatePath("/intelligence");
    redirect("/admin/intelligence");
  }

  return (
    <div className="bg-dark-pitch min-h-screen text-white selection:bg-electric-lime selection:text-black">
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-eagles-green/5 blur-[160px] pointer-events-none rounded-full" />

      <header className="px-6 pt-12 pb-12 md:px-12 md:pt-20 md:pb-16 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-2xl">
              <div
                className={`w-1.5 h-1.5 rounded-full ${report.status === "APPROVED" ? "bg-eagles-green shadow-[0_0_10px_#008751]" : "bg-yellow-500 shadow-[0_0_10px_#eab308]"} animate-pulse`}
              />
              <span className="text-[9px] font-mono text-gray-500 tracking-[0.4em] uppercase font-black">
                Mission Dossier // SEC_LEVEL_4 // ID_{report.id.slice(0, 8)}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] italic">
              Review <br />
              <span className="text-white/20">Operations</span>
            </h1>
          </div>

          <a
            href="/admin/intelligence"
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-all duration-500"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
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
            </div>
            Abort Review
          </a>
        </div>
      </header>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <main className="w-full max-w-5xl mx-auto px-6 md:px-12 py-16 pb-60 relative z-10">
        <form action={updateReportAction} className="space-y-16">
          <input type="hidden" name="id" value={report.id} />

          <div className="grid grid-cols-1 gap-14">
            {/* Field: Title */}
            <div className="group space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-eagles-green/40" />
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-eagles-green opacity-60">
                  Operation Headline
                </label>
              </div>
              <input
                name="title"
                defaultValue={report.title}
                className="w-full bg-transparent border-l-2 border-white/5 focus:border-eagles-green pl-8 py-4 text-3xl md:text-5xl font-black text-white focus:outline-none transition-all placeholder:text-white/5"
                placeholder="Enter tactical headline..."
              />
            </div>

            {/* Field: Abstract */}
            <div className="group space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-eagles-green/40" />
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-eagles-green opacity-60">
                  Intelligence Abstract
                </label>
              </div>
              <textarea
                name="description"
                defaultValue={report.description}
                rows={3}
                className="w-full bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 text-lg font-medium text-gray-300 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] transition-all resize-none leading-relaxed shadow-2xl"
                placeholder="Draft the executive summary..."
              />
            </div>

            {/* Field: Content */}
            <div className="group space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-eagles-green/40" />
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-eagles-green opacity-60">
                  Full Synthesis (MD)
                </label>
              </div>
              <textarea
                name="content"
                defaultValue={report.content || ""}
                rows={18}
                className="w-full bg-[#080808] border border-white/5 rounded-[2.5rem] p-10 text-sm font-mono leading-relaxed text-gray-400 focus:outline-none focus:border-electric-lime/20 transition-all shadow-inner selection:bg-electric-lime/20"
                placeholder="Finalize the tactical synthesis..."
              />
            </div>
          </div>
            <div className="flex justify-start">
              <button
                type="submit"
                className="group relative px-14 py-5 bg-transparent overflow-hidden rounded-full border border-white/10 transition-all hover:border-white/30"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity" />
                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 group-hover:text-white transition-colors">
                  Save Progress
                </span>
              </button>
            </div>
        </form>

        <section className="mt-32 pt-24 border-t border-white/3 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-eagles-green">
                Communications Assets
              </h2>
              <p className="text-sm text-gray-500 max-w-xl leading-relaxed font-medium">
                Repurpose this dossier for social distribution. Content is
                optimized for character limits and professional engagement.
              </p>
            </div>

            <form action={generateSocialAssetsAction}>
              <input type="hidden" name="id" value={report.id} />
              <button
                type="submit"
                className="group relative px-8 py-4 bg-white/3 overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-white/20 active:scale-95"
              >
                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                  {report.broadcastLogs ? "Regenerate Assets" : "Generate Social Intel"}
                </span>
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-12 pt-8">
            {report.broadcastLogs ? (
              (report.broadcastLogs as any).map((log: any, idx: number) => (
                <CopySnippet
                  key={idx}
                  label={log.platform}
                  snippet={log.snippet || ""}
                />
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-4xl bg-white/1">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
                  Ready for repurposing sequence
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="mt-32 pt-24 border-t border-white/3">
          <div className="relative group max-w-3xl">
            <div className="absolute -inset-0.5 bg-linear-to-r from-eagles-green/20 to-electric-lime/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative bg-[#0A0A0A] border border-white/5 p-10 md:p-16 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
              {/* Decorative Circuit Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-eagles-green/5 blur-3xl rounded-full" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 relative z-10">
                <div className="space-y-4">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-electric-lime">
                    Final Review
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    Authorizing this dossier will commit all changes and
                    broadcast the intelligence across the public network.
                  </p>
                </div>

                <form action={approveReportAction} className="w-full md:w-auto">
                  <input type="hidden" name="id" value={report.id} />
                  <button
                    disabled={report.status === "APPROVED"}
                    className={`group relative px-12 py-6 rounded-2xl overflow-hidden transition-all duration-500 ${
                      report.status === "APPROVED"
                        ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                        : "bg-eagles-green text-white hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,135,81,0.25)]"
                    }`}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                      {report.status === "APPROVED"
                        ? "Mission Broadcasted"
                        : "Authorize Release"}
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 flex flex-col md:flex-row justify-between gap-12 opacity-20 hover:opacity-100 transition-opacity duration-700">
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
              Source Audit
            </span>
            <div className="text-[11px] font-mono text-white/50">
              {report.sourceUrl || "INTERNAL_GEN_CORE"}
            </div>
          </div>
          <div className="space-y-2 md:text-right">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
              Log Cycle
            </span>
            <div className="text-[11px] font-mono text-white/50 uppercase">
              {new Date(report.date).toUTCString()}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
