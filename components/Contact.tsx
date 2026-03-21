"use client";

import { portfolioData } from "@/lib/data";
import Link from "next/link";

// SVG icon map for all platforms
const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  if (p === "github")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  if (p === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  if (p === "medium")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    );
  if (p === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    );
  if (p === "telegram")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    );
  if (p === "discord")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.11 18.1.127 18.115c2.054 1.506 4.044 2.421 5.998 3.03a.077.077 0 0 0 .083-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.01 13.01 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
    );
  return <span className="text-[10px] font-bold uppercase">{platform.slice(0, 2)}</span>;
};

type SocialHandle = {
  platform: string;
  url: string;
  handle: string;
  color: string;
};

const allSocials: SocialHandle[] = [
  { platform: "GitHub", url: portfolioData.personalInfo.socials.find(s => s.platform === "GitHub")?.url || "#", handle: "@brytebee", color: "hover:text-foreground hover:border-foreground/40" },
  { platform: "LinkedIn", url: portfolioData.chatData.linkedin, handle: "in/brytebee", color: "hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/40" },
  { platform: "Medium", url: portfolioData.personalInfo.socials.find(s => s.platform === "Medium")?.url || "#", handle: "@brytebee", color: "hover:text-foreground hover:border-foreground/40" },
  { platform: "WhatsApp", url: portfolioData.chatData.whatsapp, handle: "+234 706 632 4306", color: "hover:text-emerald-600 dark:hover:text-[#25D366] hover:border-emerald-400/40" },
  { platform: "Telegram", url: portfolioData.chatData.telegram, handle: "@brytebee", color: "hover:text-sky-500 hover:border-sky-400/40" },
  { platform: "Discord", url: portfolioData.chatData.discord, handle: "brytebee", color: "hover:text-indigo-500 hover:border-indigo-400/40" },
];

export default function Contact() {
  const { callToAction, personalInfo } = portfolioData;

  return (
    <footer className="relative overflow-hidden bg-background border-t border-black/5 dark:border-white/5">
      {/* CTA Section */}
      <div className="py-32 px-6 md:px-20 text-center relative z-10 border-b border-black/5 dark:border-white/5">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto space-y-8 relative">
          <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-600 dark:text-[#00E676] uppercase">
            Open to Opportunities
          </span>
          <h2 className="text-[40px] md:text-[56px] font-black leading-[1.1] tracking-[-0.03em] text-foreground">
            {callToAction.text}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${callToAction.email}`}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background font-bold text-[15px] hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 rounded-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              {callToAction.email}
            </a>
            <a
              href={portfolioData.chatData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-foreground font-bold text-[15px] transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              <PlatformIcon platform="WhatsApp" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Social Handles Grid */}
      <div className="py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] font-bold tracking-[0.2em] text-slate-500 dark:text-white/30 uppercase mb-12">
            Find me on the internet
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {allSocials.map((social) => (
              <Link
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border border-black/5 dark:border-white/5 bg-black/2 dark:bg-white/2 transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-[1.04] active:scale-[0.97] ${social.color}`}
              >
                <div className="text-slate-500 dark:text-white/40 transition-colors duration-300 group-hover:text-current">
                  <PlatformIcon platform={social.platform} />
                </div>
                <div className="text-center">
                  <p className="text-[12px] font-bold text-foreground tracking-tight">{social.platform}</p>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-white/30 mt-0.5 truncate max-w-[100px]">{social.handle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-8 px-6 md:px-20 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] font-mono text-slate-500 dark:text-white/30">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p>Engineered with Next.js 16 & Tailwind 4</p>
      </div>
    </footer>
  );
}
