import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Management | Admin",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
