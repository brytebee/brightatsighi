import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce Intelligence | Labs",
  description: "Live heuristic engine tracking synthetic high-velocity demand signals.",
};

export default function EcommerceLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
