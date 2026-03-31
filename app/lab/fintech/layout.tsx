import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fintech Risk Operations | Labs",
  description: "Live dashboard demonstrating high-stakes financial telemetry and heuristic risk scoring.",
};

export default function FintechLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
