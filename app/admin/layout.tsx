import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-surface border-r border-border p-6 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin Dashboard</h1>
        <nav className="space-y-4">
          <Link
            href="/"
            className="block p-2 rounded hover:bg-secondary text-primary"
          >
            ← Portfolio
          </Link>
          <div className="h-px bg-border my-2"></div>
          <Link href="/admin" className="block p-2 rounded hover:bg-secondary">
            Overview
          </Link>
          <Link
            href="/admin/profile"
            className="block p-2 rounded hover:bg-secondary"
          >
            Profile
          </Link>
          <Link
            href="/admin/projects"
            className="block p-2 rounded hover:bg-secondary"
          >
            Projects
          </Link>
          <Link
            href="/admin/experience"
            className="block p-2 rounded hover:bg-secondary"
          >
            Experience
          </Link>
          <Link
            href="/admin/writing"
            className="block p-2 rounded hover:bg-secondary"
          >
            Writing
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 w-52">
          <form
            action={async () => {
              "use server";
              const { logout } = await import("@/app/lib/actions");
              await logout();
            }}
          >
            <button className="w-full text-left p-2 text-red-500 hover:bg-red-500/10 rounded font-medium">
              Safe Logout
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 bg-background">{children}</main>
    </div>
  );
}
