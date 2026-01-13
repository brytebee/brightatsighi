import Hero from "@/components/Hero";
import SkillMatrix from "@/components/SkillMatrix";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Recommendations from "@/components/Recommendations";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-accent selection:text-black">
      <Hero />
      <SkillMatrix />
      <Experience />
      <Projects />
      <Recommendations />
      <Blog />
      <Contact />
    </main>
  );
}
