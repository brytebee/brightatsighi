export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome Back, Bright</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-surface border border-border rounded-xl">
          <h3 className="text-lg font-bold mb-2">Projects</h3>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <div className="p-6 bg-surface border border-border rounded-xl">
          <h3 className="text-lg font-bold mb-2">Writing</h3>
          <p className="text-muted-foreground">
            Manage blog entries (Manual overrides)
          </p>
        </div>
        <div className="p-6 bg-surface border border-border rounded-xl">
          <h3 className="text-lg font-bold mb-2">Metrics</h3>
          <p className="text-muted-foreground">View site visit stats</p>
        </div>
      </div>
    </div>
  );
}
