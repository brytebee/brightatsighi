"use client";

import { useTransition, useState } from "react";
import { createWriting } from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import TiptapEditor from "./editor/TiptapEditor";

export default function WritingForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    // Inject content and status
    formData.set("content", content);
    formData.set("published", isPublished.toString());

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
    <form action={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-20">
      <input
        name="title"
        required
        className="w-full text-5xl font-bold bg-transparent border-none placeholder:text-muted-foreground/50 focus:ring-0 outline-none"
        placeholder="Title"
      />

      <input
        name="description"
        required
        className="w-full text-xl text-muted-foreground bg-transparent border-none placeholder:text-muted-foreground/50 focus:ring-0 outline-none"
        placeholder="Brief subtitle or description..."
      />

      <div className="flex gap-4 text-sm text-muted-foreground/60">
        <input
          name="date"
          type="text"
          placeholder="Date (e.g. Oct 2025)"
          className="bg-transparent border-b border-sidebar-border focus:border-foreground outline-none w-32"
        />
        <input
          name="readTime"
          type="text"
          placeholder="Read Time (e.g. 5 min)"
          className="bg-transparent border-b border-sidebar-border focus:border-foreground outline-none w-32"
        />
      </div>

      <input
        name="link"
        type="url"
        className="w-full p-2 bg-surface/50 border border-border rounded text-sm font-mono placeholder:text-muted-foreground/50"
        placeholder="External Link (Optional)"
      />

      {/* Rich Text Editor */}
      <div className="min-h-[50vh]">
        <TiptapEditor content="" onChange={setContent} />
      </div>

      <div className="fixed bottom-8 right-8 flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          {isPending ? "Saving..." : "Unsaved changes"}
        </span>

        <button
          type="submit"
          disabled={isPending}
          onClick={() => setIsPublished(false)}
          className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-full font-medium transition-colors disabled:opacity-50"
        >
          Save Draft
        </button>

        <button
          type="submit"
          disabled={isPending || !content}
          onClick={() => setIsPublished(true)}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors shadow-lg disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
