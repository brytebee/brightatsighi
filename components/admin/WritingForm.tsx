"use client";

import { useTransition, useState } from "react";
import { createWriting } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import TiptapEditor from "./editor/TiptapEditor";
import Image from "next/image";

export default function WritingForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // Real-time AI preview state
  const [titleStr, setTitleStr] = useState("");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [previewSeed, setPreviewSeed] = useState<number | null>(null);

  // Generate Pollinations URL on the fly (Writing specific prompt)
  const generatedImageUrl = previewSeed !== null && titleStr.trim() !== "" 
    ? (() => {
        const imagePrompt = `highly detailed cinematic cover art about ${titleStr}. stylized, masterpiece, 8k resolution, photorealistic, dramatic lighting, clean composition`;
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1200&height=630&nologo=true&seed=${previewSeed}`;
      })()
    : "";

  const finalImageUrlToSubmit = customImageUrl || generatedImageUrl;

  const handleSubmit = async (formData: FormData) => {
    // Inject content and status
    formData.set("content", content);
    formData.set("published", isPublished.toString());
    if (finalImageUrlToSubmit) {
      formData.set("image", finalImageUrlToSubmit);
    }

    if (!formData.get("date")) {
      formData.set(
        "date",
        new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      );
    }

    startTransition(async () => {
      await createWriting(formData);
      router.push("/admin/writing");
    });
  };

  return (
    <form action={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-32">
      <div className="flex justify-between items-center bg-dark-pitch p-4 rounded-xl border border-white/5">
        <h2 className="text-xl font-mono text-eagles-green font-black uppercase tracking-wider">New Content Publication</h2>
        <span className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">ADMIN // AUTHORIZED</span>
      </div>

      <input
        name="title"
        required
        value={titleStr}
        onChange={(e) => setTitleStr(e.target.value)}
        className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none placeholder:text-muted-foreground/50 text-white focus:ring-0 outline-none uppercase font-sans tracking-tighter"
        placeholder="Article Title"
      />

      <input
        name="description"
        required
        className="w-full text-xl text-muted-foreground bg-transparent text-white border-none placeholder:text-muted-foreground/50 focus:ring-0 outline-none"
        placeholder="Brief subtitle or description..."
      />

      <div className="flex gap-4 text-sm text-muted-foreground/60">
        <input
          name="date"
          type="text"
          placeholder="Date (e.g. Oct 2025)"
          className="bg-transparent text-white border-b border-sidebar-border focus:border-eagles-green outline-none w-48 font-mono text-xs"
        />
        <input
          name="readTime"
          type="text"
          placeholder="Read Time (e.g. 5 min)"
          className="bg-transparent text-white border-b border-sidebar-border focus:border-eagles-green outline-none w-48 font-mono text-xs"
        />
      </div>

      {/* Real-time AI Image Generator Section */}
      <div className="space-y-4 p-5 rounded-xl border border-white/10 bg-[#0d0d0d]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            <h3 className="font-mono text-xs font-bold text-yellow-500 uppercase tracking-widest">Visual Assets</h3>
          </div>
          <button
            type="button"
            onClick={() => setPreviewSeed(Math.floor(Math.random() * 100000))}
            disabled={!titleStr.trim()}
            className="text-[10px] uppercase font-mono font-bold bg-eagles-green/10 text-eagles-green px-3 py-1.5 rounded hover:bg-eagles-green/20 border border-eagles-green/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {previewSeed === null ? "Generate AI Cover" : "Regenerate Image"}
          </button>
        </div>

        {/* The Preview Pane */}
        {generatedImageUrl && !customImageUrl && (
          <div className="relative w-full aspect-[1.9] bg-black rounded-lg overflow-hidden border border-white/5">
            {/* Loading scanline indicator since Pollinations takes a few seconds to stream */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-[10px] font-mono text-eagles-green uppercase tracking-[0.2em] animate-pulse">
              [ Synthesizing Image Feed... ]
            </div>
            {/* The actual image */}
            <Image 
              src={generatedImageUrl} 
              alt="AI Preview" 
              fill 
              className="object-cover relative z-10"
              unoptimized 
            />
          </div>
        )}

        <div className="pt-2">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 px-1">Or intercept with secure visual feed URL:</p>
          <input
            name="imageOverride"
            type="url"
            value={customImageUrl}
            onChange={(e) => setCustomImageUrl(e.target.value)}
            className="w-full p-3 bg-white/[0.02] text-white border border-white/10 rounded-lg text-sm font-mono placeholder:text-muted-foreground/50 focus:border-eagles-green transition-colors outline-none"
            placeholder="Cloudinary Image URL (Overrides AI Generator)"
          />
        </div>
      </div>

      <input
        name="link"
        type="url"
        className="w-full p-3 bg-white/[0.02] border border-white/10 rounded-lg text-sm font-mono placeholder:text-muted-foreground/50 focus:border-eagles-green transition-colors text-white outline-none"
        placeholder="External Link (Optional)"
      />

      {/* Rich Text Editor */}
      <div className="min-h-[50vh] border border-border rounded-xl bg-surface/30 overflow-hidden">
        <div className="p-3 bg-secondary/30 border-b border-border font-mono text-xs text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-eagles-green" />
          <span className="ml-2 uppercase tracking-widest text-[9px] text-eagles-green">Standard Text Editor</span>
        </div>
        <div className="p-4 text-white">
          <TiptapEditor content="" onChange={setContent} />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex items-center gap-4 bg-[#0a0a0a] p-3 rounded-full border border-white/10 shadow-2xl z-50">
        <span className="text-xs text-muted-foreground px-4 font-mono uppercase">
          {isPending ? "Publishing..." : "Unsaved changes"}
        </span>

        <button
          type="submit"
          disabled={isPending}
          onClick={() => setIsPublished(false)}
          className="px-6 py-2 bg-[#222] hover:bg-[#333] text-foreground text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          Save Draft
        </button>

        <button
          type="submit"
          disabled={isPending || !content || (!titleStr.trim())}
          onClick={() => setIsPublished(true)}
          className="px-8 py-2 bg-gradient-to-r from-eagles-green to-emerald-600 hover:to-emerald-500 text-white rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-eagles-green/20 disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
