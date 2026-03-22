"use client";

import { useTransition, useState } from "react";
import { createIntelligence } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import TiptapEditor from "./editor/TiptapEditor";

export default function IntelligenceForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("PENDING");

  const handleSubmit = async (formData: FormData) => {
    // Inject content and status
    formData.set("content", content);
    formData.set("status", status);

    if (!formData.get("date")) {
      formData.set("date", new Date().toISOString());
    }

    startTransition(async () => {
      await createIntelligence(formData);
      router.push("/admin/intelligence");
    });
  };

  return (
    <form action={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center bg-[#0a0f0d] p-4 rounded-xl border border-white/5">
        <h2 className="text-xl font-mono text-[#008751] font-black uppercase tracking-wider">New Intelligence Brief</h2>
        <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">ADMIN // AUTHORIZED</span>
      </div>

      <input
        name="title"
        required
        className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none placeholder:text-muted-foreground/50 focus:ring-0 outline-none uppercase font-sans tracking-tighter"
        placeholder="Brief Title"
      />

      <input
        name="description"
        required
        className="w-full text-xl text-muted-foreground bg-transparent border-none placeholder:text-muted-foreground/50 focus:ring-0 outline-none"
        placeholder="Executive summary / Excerpt..."
      />

      <div className="flex gap-4 text-sm text-muted-foreground/60 flex-wrap">
        <select
          name="category"
          required
          className="bg-[#0a0a0a] border border-white/10 rounded px-3 py-2 focus:border-[#008751] outline-none text-white font-mono text-xs uppercase"
          defaultValue="tech-intelligence"
        >
          <option value="esports-intelligence">Esports Intelligence</option>
          <option value="tech-intelligence">Tech Intelligence</option>
          <option value="fintech-policy">Fintech / Policy</option>
          <option value="ai-systems">AI Systems</option>
          <option value="market-analysis">Market Analysis</option>
        </select>
        
        <input
          name="date"
          type="text"
          placeholder="Override Date (ISO format)"
          className="bg-transparent border-b border-sidebar-border focus:border-foreground outline-none w-48 font-mono text-xs"
        />
      </div>

      <div className="space-y-4">
        <input
          name="image"
          type="url"
          className="w-full p-3 bg-surface/50 border border-border rounded-lg text-sm font-mono placeholder:text-muted-foreground/50 focus:border-[#008751] transition-colors"
          placeholder="Cloudinary Image URL (Optional)"
        />
        
        <input
          name="sourceUrl"
          type="url"
          className="w-full p-3 bg-surface/50 border border-border rounded-lg text-sm font-mono placeholder:text-muted-foreground/50 focus:border-[#008751] transition-colors"
          placeholder="Source Article URL (Optional)"
        />

        <input
          name="link"
          type="url"
          className="w-full p-3 bg-surface/50 border border-border rounded-lg text-sm font-mono placeholder:text-muted-foreground/50 focus:border-[#008751] transition-colors"
          placeholder="External Reading Link (Optional)"
        />
      </div>

      {/* Rich Text Editor */}
      <div className="min-h-[50vh] border border-border rounded-xl bg-surface/30 overflow-hidden">
        <div className="p-3 bg-secondary/30 border-b border-border font-mono text-xs text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="ml-2 uppercase tracking-widest text-[9px] text-[#008751]">Classified Dossier Editor</span>
        </div>
        <div className="p-4">
          <TiptapEditor content="" onChange={setContent} />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-full border border-white/10 shadow-2xl z-50">
        <span className="text-xs text-muted-foreground px-4 font-mono uppercase">
          {isPending ? "Syncing to mainframe..." : "Unsaved changes"}
        </span>

        <button
          type="submit"
          disabled={isPending}
          onClick={() => setStatus("PENDING")}
          className="px-6 py-2 bg-[#222] hover:bg-[#333] text-foreground rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          Save Draft (Pending)
        </button>

        <button
          type="submit"
          disabled={isPending || !content}
          onClick={() => setStatus("APPROVED")}
          className="px-8 py-2 bg-gradient-to-r from-[#008751] to-emerald-600 hover:to-emerald-500 text-white rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[#008751]/20 disabled:opacity-50"
        >
          Approve & Publish
        </button>
      </div>
    </form>
  );
}
