"use client";

import { useState, useTransition } from "react";
import type { TeamMember } from "@/lib/sheets";
import {
  toggleTeamMemberStatusAction,
  removeTeamMemberAction,
} from "@/app/actions/team";

const ROLE_COLORS: Record<string, string> = {
  Admin: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  Moderator: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

export default function TeamMemberRow({ member }: { member: TeamMember }) {
  const [isPending, startTransition] = useTransition();
  const [actionType, setActionType] = useState<"toggle" | "remove" | null>(null);
  const isActive = member.status.toLowerCase() === "active";
  const roleClass = ROLE_COLORS[member.role] ?? "bg-muted/20 text-muted-foreground border border-border";

  return (
    <li className={`px-6 py-4 flex items-center justify-between gap-4 transition-opacity ${isPending ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar initials */}
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 uppercase">
          {member.email.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">{member.email}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleClass}`}>
              {member.role}
            </span>
            <span className={`text-xs font-medium ${isActive ? "text-green-400" : "text-red-400"}`}>
              {isActive ? "● Active" : "○ Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Toggle status */}
        <button
          disabled={isPending}
          onClick={() => {
            setActionType("toggle");
            startTransition(() =>
              toggleTeamMemberStatusAction(member.rowIndex, member.status)
            );
          }}
          className="text-xs px-3 py-1.5 rounded border border-border flex items-center justify-center min-w-[70px] hover:bg-secondary transition-colors disabled:cursor-not-allowed"
          title={isActive ? "Disable access" : "Enable access"}
        >
          {isPending && actionType === "toggle" ? (
            <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isActive ? "Disable" : "Enable"}
        </button>

        {/* Remove */}
        <button
          disabled={isPending}
          onClick={() => {
            if (!confirm(`Remove ${member.email}? They will lose access immediately.`)) return;
            setActionType("remove");
            startTransition(() => removeTeamMemberAction(member.rowIndex));
          }}
          className="text-xs px-3 py-1.5 rounded border border-red-500/30 text-red-400 flex items-center justify-center min-w-[76px] hover:bg-red-500/10 transition-colors disabled:cursor-not-allowed"
          title="Remove from sheet"
        >
          {isPending && actionType === "remove" ? (
            <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          Remove
        </button>
      </div>
    </li>
  );
}
