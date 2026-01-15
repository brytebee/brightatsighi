"use client";

import { useTransition, useState } from "react";
import { createExperience } from "@/app/actions/admin";
import { useRouter } from "next/navigation";

export default function ExperienceForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Local state for dynamic description list
  const [descriptions, setDescriptions] = useState<string[]>([""]);

  const addDescription = () => setDescriptions([...descriptions, ""]);

  const updateDescription = (index: number, value: string) => {
    const newDesc = [...descriptions];
    newDesc[index] = value;
    setDescriptions(newDesc);
  };

  const removeDescription = (index: number) => {
    const newDesc = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDesc);
  };

  const handleSubmit = async (formData: FormData) => {
    // Append the JSON string for descriptions
    // Filter out empty strings
    const validDescriptions = descriptions.filter((d) => d.trim() !== "");
    formData.set("description_json", JSON.stringify(validDescriptions));

    startTransition(async () => {
      await createExperience(formData);
      router.push("/admin/experience");
    });
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-6 max-w-2xl bg-surface p-6 rounded-xl border border-border"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Company Name</label>
          <input
            name="company"
            required
            className="w-full p-3 bg-background border border-border rounded focus:primary-glow outline-none"
            placeholder="Microsoft"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Role</label>
          <input
            name="role"
            required
            className="w-full p-3 bg-background border border-border rounded focus:primary-glow outline-none"
            placeholder="Senior Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Period</label>
          <input
            name="period"
            required
            className="w-full p-3 bg-background border border-border rounded focus:primary-glow outline-none"
            placeholder="Jan 2023 - Present"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Website Link</label>
          <input
            name="link"
            type="url"
            className="w-full p-3 bg-background border border-border rounded focus:primary-glow outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid gap-4">
        <label className="text-sm font-medium">
          Key Achievements (Description)
        </label>
        {descriptions.map((desc, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              value={desc}
              onChange={(e) => updateDescription(idx, e.target.value)}
              className="flex-1 p-3 bg-background border border-border rounded focus:primary-glow outline-none"
              placeholder={`Achievement ${idx + 1}`}
            />
            <button
              type="button"
              onClick={() => removeDescription(idx)}
              className="p-3 text-destructive hover:bg-destructive/10 rounded"
              disabled={descriptions.length === 1}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addDescription}
          className="text-sm text-primary hover:underline self-start"
        >
          + Add another achievement
        </button>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Add Experience"}
      </button>
    </form>
  );
}
