import { getTeamMembers } from "@/lib/sheets";
import AddTeamMemberForm from "@/components/admin/AddTeamMemberForm";
import TeamMemberRow from "@/components/admin/TeamMemberRow";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  let members: Awaited<ReturnType<typeof getTeamMembers>> = [];
  let error: string | null = null;

  try {
    members = await getTeamMembers();
  } catch (e: any) {
    error = e.message ?? "Failed to load team members.";
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1">Team Access</h2>
        <p className="text-muted-foreground text-sm">
          Manage who can sign into this admin dashboard. Changes sync instantly to your Google Sheet.
        </p>
      </div>

      {/* Add Form */}
      <div className="mb-8 p-6 bg-surface border border-border rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Add a Member</h3>
        <AddTeamMemberForm />
      </div>

      {/* Member List */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold">Current Members</h3>
          <span className="text-sm text-muted-foreground">{members.length} total</span>
        </div>

        {error ? (
          <div className="px-6 py-8 text-center">
            <p className="text-red-400 text-sm font-medium mb-1">⚠ Failed to load</p>
            <p className="text-xs text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Make sure <code className="bg-black/20 px-1 rounded">GOOGLE_SERVICE_ACCOUNT_JSON</code> and{" "}
              <code className="bg-black/20 px-1 rounded">GOOGLE_SHEET_ID</code> are set correctly.
            </p>
          </div>
        ) : members.length === 0 ? (
          <div className="px-6 py-8 text-center text-muted-foreground text-sm">
            No members yet. Add the first one above.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {members.map((member) => (
              <TeamMemberRow key={member.rowIndex} member={member} />
            ))}
          </ul>
        )}
      </div>

      {/* Footer tip */}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        Disabling a member sets their status to <strong>Inactive</strong> in the Sheet — they can no longer sign in.
      </p>
    </div>
  );
}
