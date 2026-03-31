import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Management | Admin",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
