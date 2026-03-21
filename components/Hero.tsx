"use client";

import { portfolioData } from "@/lib/data";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const { personalInfo, chatData } = portfolioData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 py-32 md:py-40 overflow-hidden text-center z-10">
      {/* Background gradients for the "Naija-Futurism" aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1A237E]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#00E676]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Eyebrow Label */}
        <div 
          data-reveal 
          className="reveal-item inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] text-slate-600 dark:text-[#8C9EFF] uppercase backdrop-blur-sm"
          style={{ transitionDelay: '0ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] mr-2 animate-pulse" />
          {personalInfo.location} • Available
        </div>

        {/* Massive H1 */}
        <h1 
          data-reveal 
          className="reveal-item text-[13vw] leading-[1.05] tracking-tighter sm:text-[80px] md:text-[96px] lg:text-[110px] font-black text-foreground"
          style={{ transitionDelay: '100ms' }}
        >
          {personalInfo.name.toUpperCase()}
        </h1>

        {/* Subtitle */}
        <p 
          data-reveal 
          className="reveal-item max-w-2xl text-[18px] md:text-[22px] leading-relaxed text-slate-600 dark:text-[#8C9EFF]/80 font-medium"
          style={{ transitionDelay: '200ms' }}
        >
          Senior Full Stack Engineer forging{' '}
          <span className="text-slate-900 dark:text-foreground hover:text-accent transition-colors cursor-crosshair">complex fintech architectures</span>{' '}
          & scalable product ecosystems.
        </p>

        {/* CTAs */}
        <div 
          data-reveal 
          className="reveal-item flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
          style={{ transitionDelay: '300ms' }}
        >
          {/* Primary WhatsApp CTA */}
          <Link
            href={chatData.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-foreground px-8 py-4 text-[14px] font-black text-background transition-all hover:scale-105 active:scale-95"
          >
            {/* Soft Green Glow Behind Button */}
            <div className="absolute -inset-1 rounded-full bg-[#00E676] opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
            <svg className="relative z-10 w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span className="relative z-10">Chat with Founder</span>
          </Link>
          
          {/* Secondary CTA */}
          <Link
            href="#experience"
            className="flex items-center justify-center w-full sm:w-auto rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-8 py-4 text-[14px] font-bold text-foreground transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 backdrop-blur-md"
          >
            View Selected Works
          </Link>
        </div>
      </div>

      {/* Decorative Technical Terminal */}
      <div 
        data-reveal
        className={`reveal-item mt-20 w-full max-w-4xl relative group ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-[#1A237E]/40 blur-xl opacity-50 group-hover:opacity-100 transition duration-700" />
        <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-background/80 backdrop-blur-xl p-5 text-left font-mono shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-black/10 dark:border-white/10 pb-4">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 text-[12px] text-slate-500 dark:text-[#8C9EFF]/50">agent@atsighi:~</span>
          </div>
          
          {/* Terminal Body */}
          <div className="text-[13px] md:text-[14px] leading-[1.8] text-slate-700 dark:text-foreground/70">
            <p><span className="text-emerald-600 dark:text-[#00E676]">➜</span> <span className="text-indigo-600 dark:text-[#8C9EFF]">~</span> <span className="font-semibold text-foreground">cat</span> identity.yaml</p>
            <p className="mt-2 pl-4 text-slate-600 dark:text-[#8C9EFF]/80">name: <span className="text-indigo-700 dark:text-[#c7cfff]">"{personalInfo.name}"</span></p>
            <p className="pl-4 text-slate-600 dark:text-[#8C9EFF]/80">role: <span className="text-indigo-700 dark:text-[#c7cfff]">"{personalInfo.role}"</span></p>
            <p className="pl-4 text-slate-600 dark:text-[#8C9EFF]/80">status: <span className="text-emerald-600 dark:text-[#00E676]">"Deploying scalable infrastructure"</span></p>
            <p className="pl-4 text-slate-600 dark:text-[#8C9EFF]/80">stack: [</p>
            <p className="pl-12 text-indigo-700 dark:text-[#c7cfff]">"Next.js App Router",</p>
            <p className="pl-12 text-indigo-700 dark:text-[#c7cfff]">"Node.js Ecosystem",</p>
            <p className="pl-12 text-indigo-700 dark:text-[#c7cfff]">"AWS / Serverless"</p>
            <p className="pl-4 text-slate-600 dark:text-[#8C9EFF]/80">]</p>
            {/* Blinking cursor */}
            <p className="mt-2"><span className="text-emerald-600 dark:text-[#00E676]">➜</span> <span className="text-indigo-600 dark:text-[#8C9EFF]">~</span> <span className="inline-block w-2.5 h-4 bg-foreground/80 animate-pulse translate-y-1" /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
