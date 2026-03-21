import Hero from "@/components/Hero";
import SkillMatrix from "@/components/SkillMatrix";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Recommendations from "@/components/Recommendations";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export const revalidate = 86400; // Revalidate every 24 hours

export const metadata: Metadata = {
  title: "Bright Atsighi | Senior Full Stack Engineer",
  description: `Senior-level Full Stack Engineer with over 5 years of experience specializing in scalable backend architectures, fintech integrations, and DevOps.`,
  openGraph: {
    title: "Bright Atsighi | Senior Full Stack Engineer",
    description: `Senior-level Full Stack Engineer with over 5 years of experience specializing in scalable backend architectures, fintech integrations, and DevOps.`,
  },
};

export default function Home() {
  return (
    <main 
      className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-white overflow-x-hidden font-sans transition-colors duration-300 relative w-full"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ── Force Inter from Google Fonts ── */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <ScrollReveal />

      <Hero />
      <div id="experience">
        <Experience />
        <Projects />
      </div>
      <SkillMatrix />
      <Recommendations />
      <Blog />
      <Contact />
    </main>
  );
}
