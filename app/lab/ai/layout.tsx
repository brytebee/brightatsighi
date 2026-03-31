import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Document Pipeline | Labs",
  description: "Live LLM structured extraction pipeline connected to the Next.js Edge Runtime.",
};

export default function AILabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
