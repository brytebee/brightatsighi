"use server";

import { revalidatePath } from "next/cache";
import {
  addTeamMember,
  updateTeamMemberStatus,
  removeTeamMember,
} from "@/lib/sheets";

export async function addTeamMemberAction(formData: FormData) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;

  if (!email || !role) throw new Error("Email and role are required.");
  await addTeamMember(email, role);
  revalidatePath("/admin/team");
}

export async function toggleTeamMemberStatusAction(
  rowIndex: number,
  currentStatus: string
) {
  const newStatus = currentStatus.toLowerCase() === "active" ? "Inactive" : "Active";
  await updateTeamMemberStatus(rowIndex, newStatus as "Active" | "Inactive");
  revalidatePath("/admin/team");
}

export async function removeTeamMemberAction(rowIndex: number) {
  await removeTeamMember(rowIndex);
  revalidatePath("/admin/team");
}
