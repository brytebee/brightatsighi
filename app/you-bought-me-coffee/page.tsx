import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Bright Atsighi",
  description: "Thank you for your support!",
};

export default function YouBoughtMeCoffee() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 pt-20 pb-10 selection:bg-accent selection:text-black">
      <div className="max-w-lg w-full text-center space-y-8 animate-in slide-in-from-bottom-8 duration-700 fade-in">
        {/* Coffee Icons & Effects */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse delay-150"></div>
          <div className="absolute inset-4 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>

          <div className="relative bg-surface/50 backdrop-blur-sm border border-border w-28 h-28 rounded-full flex items-center justify-center shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
              <line x1="6" x2="6" y1="2" y2="4" />
              <line x1="10" x2="10" y1="2" y2="4" />
              <line x1="14" x2="14" y1="2" y2="4" />
            </svg>

            {/* Success Badge */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-2 border-4 border-background shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-5 h-5 text-white dark:text-zinc-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="inline-block">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-500 text-sm font-mono font-medium border border-green-500/20">
              Payment Successful
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            You bought me a coffee!
          </h1>

          <p className="text-xl text-muted-foreground/80 leading-relaxed max-w-md mx-auto">
            Thanks a million for your support. It keeps my code compiling, the
            servers running, and my mug full!
          </p>
        </div>

        {/* Code Visualizer Logs */}
        <div className="mt-8 relative rounded-lg bg-surface border border-border p-4 font-mono text-sm overflow-hidden shadow-xl text-left max-w-sm mx-auto">
          <div className="flex gap-2 border-b border-border pb-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-muted-foreground/60">
              system_logs.sh
            </span>
          </div>
          <div className="text-muted-foreground/80 space-y-2">
            <p className="text-green-600 dark:text-green-500">
              &gt; Authenticating transaction...
            </p>
            <p className="text-green-600 dark:text-green-500">
              &gt; Payment verified via Paystack.
            </p>
            <p className="text-blue-600 dark:text-blue-400">
              &gt; Initializing coffee brewing protocol...
            </p>
            <p className="text-accent animate-pulse">
              &gt; Energy levels restored to 100%.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-border bg-secondary/50 hover:bg-secondary hover:border-accent hover:text-accent transition-all duration-300 text-sm font-mono text-foreground rounded-md shadow-sm group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
