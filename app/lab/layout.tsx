import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Labs",
  description: "Live demonstrations of complex architectural implementations.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
