import LoginForm from "@/components/admin/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen p-6">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex w-full items-center justify-center p-6 bg-surface border border-border rounded-xl">
          <h1 className="text-2xl font-bold">Admin Login</h1>
        </div>
        <div className="p-6 bg-surface/50 border border-border rounded-xl">
          <LoginForm />
        </div>
        <Link
          href="/"
          className="text-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Portfolio
        </Link>
      </div>
    </main>
  );
}
