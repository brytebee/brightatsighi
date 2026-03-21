import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Schedule config — all times are WAT (UTC+1)
// 8:30 PM WAT = 19:30 WAT — night-before prep
// 8:00 AM WAT = 08:00 WAT — morning go-time

export interface ScheduledAction {
  week: number;
  date: string;        // ISO date string YYYY-MM-DD
  title: string;
  url: string;
  linkedinPost: string;
  xPost: string;
  manualSteps: string[];
  tags: string[];
}

export const SCHEDULE: ScheduledAction[] = [
  {
    week: 1,
    date: "2026-03-24",
    title: "Launch /lab/fintech compliance engine",
    url: "https://brightatsighi.vercel.app/lab/fintech",
    linkedinPost: `I built a real-time AI compliance engine that runs inside a Next.js app.

It processes simulated financial transactions, scores fraud risk (0–100), flags AML patterns, and generates compliance alerts — all in under 200ms.

No ML model. No Python. Pure TypeScript + Prisma + rule-based heuristics.

Running live → https://brightatsighi.vercel.app/lab/fintech

This is the stack I'd use to bootstrap an MVP compliance layer for a CBN-regulated fintech in under 6 weeks.

If you're building in this space, let's talk.`,
    xPost: `Built a live AI compliance engine in TypeScript.

Fraud scoring. AML detection. Real-time alerts.
No Python. No ML. Just clean architecture.

→ https://brightatsighi.vercel.app/lab/fintech

The stack any Nigerian fintech can ship in 6 weeks.`,
    manualSteps: [
      "Screenshot /lab/fintech at 1440px width",
      "Screenshot the CRITICAL alert card (red one)",
      "Post LinkedIn with screenshot attached",
      "Post same on X/Twitter",
      "Tag on LinkedIn: @PaystackHQ @FlutterwaveHQ @KudaBank @MonoAfrica @LendsqrHQ",
      "Tag on X: @paystack @flutterwave @kudabank @mono_africa",
    ],
    tags: ["#FintechNG #Compliance #AML #TypeScript #NigerianTech #BuildInPublic"],
  },
  {
    week: 2,
    date: "2026-03-31",
    title: "Launch /lab index — all systems showcase",
    url: "https://brightatsighi.vercel.app/lab",
    linkedinPost: `I've been quietly building working systems, not just writing about them.

/lab is a live collection of AI agents I've shipped:

→ Fintech Compliance Engine (real-time fraud detection)
→ Intelligence Platform (automated editorial agent)
→ AI Pipeline Lab (coming Q2 2026)

Every system here is production-grade code.
Every one solves a real problem for a real industry.

https://brightatsighi.vercel.app/lab`,
    xPost: `Working systems. Not mockups.

Fintech compliance engine.
Intelligence platform.
More coming.

https://brightatsighi.vercel.app/lab`,
    manualSteps: [
      "Screenshot /lab at 1440px — full page",
      "ALSO: Before posting, ask Antigravity to 'Expand /intelligence feed to all categories with filter tabs' if not done yet",
      "Post LinkedIn + X with screenshot",
      "Tag on LinkedIn: @TechsityAfrica @TechpointAfrica @Techcabal @VercelHQ @prisma",
    ],
    tags: ["#BuildInPublic #NigerianTech #AIEngineering #FullStack"],
  },
  {
    week: 3,
    date: "2026-04-07",
    title: "Publish first cross-vertical intelligence brief — CBN Open Banking",
    url: "https://brightatsighi.vercel.app/intel",
    linkedinPost: `Most fintech founders are sleeping on the CBN's Open Banking Framework.

I wrote a brief that breaks down exactly what changes, what it costs you to ignore it, and the 3 architecture decisions you should make now.

→ https://brightatsighi.vercel.app/intel`,
    xPost: `CBN Open Banking: what it actually means for your stack.

Brief → https://brightatsighi.vercel.app/intel`,
    manualSteps: [
      "FIRST: Use this prompt to generate the article: 'Write an intelligence brief titled: CBN Open Banking Framework: What It Means for Fintech Builders in 2025. Audience: Nigerian fintech founders, CTOs, compliance officers. 600-800 words, \\n-separated paragraphs, # for section headers. Lead with a hard data point. Close with: What builders should do now.'",
      "Paste into admin panel at /admin/intelligence and approve",
      "Screenshot the dossier card from /intelligence feed",
      "Screenshot the dossier page /intelligence/[id]",
      "Post to LinkedIn + X with dossier card screenshot",
      "Tag on LinkedIn: @CBNigeria @NigerianStartups @TechpointAfrica @Techcabal @SegunAkinwale @KudaBank",
    ],
    tags: ["#OpenBanking #CBN #NigerianFintech #Compliance #FintechAfrica"],
  },
  {
    week: 4,
    date: "2026-04-14",
    title: "Open intelligence feed to all categories — platform announcement",
    url: "https://brightatsighi.vercel.app/intel",
    linkedinPost: `The intelligence feed at brightatsighi.vercel.app/intel now covers:

→ AI & LLMs
→ Fintech & Payments
→ African Tech Policy
→ EdTech & MedTech
→ Developer Intelligence

Published weekly. Dossier format. No newsletter. Just signal.

https://brightatsighi.vercel.app/intel`,
    xPost: `Intelligence feed is live across 5 verticals now.

Tech. Fintech. Policy. AI. EdTech.

Weekly. No newsletter. Just signal.

→ https://brightatsighi.vercel.app/intel`,
    manualSteps: [
      "Ask Antigravity: 'Expand /intelligence feed to all categories with filter tabs' (if not done already)",
      "Screenshot the upgraded feed with category pills visible",
      "Post LinkedIn + X",
      "Tag: @TechpointAfrica @Techcabal @YCombinator @vercel",
    ],
    tags: ["#IntelligencePlatform #AIContent #NigerianTech #BuildInPublic"],
  },
  {
    week: 5,
    date: "2026-04-21",
    title: "Intelligence brief — LLM Infrastructure Gap in African Fintech",
    url: "https://brightatsighi.vercel.app/intel",
    linkedinPost: `African fintechs are leaving massive value on the table by ignoring LLMs.

Not because they're wrong about the risk — because they don't know how to make it explainable to regulators.

I wrote a brief on the gap and who closes it first.

→ https://brightatsighi.vercel.app/intel`,
    xPost: `The LLM gap in African fintech is real.

New brief → https://brightatsighi.vercel.app/intel`,
    manualSteps: [
      "Use prompt: 'Write a brief titled: The LLM Infrastructure Gap in African Fintech. Audience: Tech founders, investors, African dev community. Show where African fintechs are failing to use LLMs and why. Close with: What the first mover wins.'",
      "Paste into admin and approve",
      "Screenshot dossier card + page",
      "Tag: @openai @anthropicAI @TechpointAfrica @KongaOnline @PaystackHQ @jinzouNiyi",
    ],
    tags: ["#LLM #AIAfrica #ArtificialIntelligence #FintechAfrica #NigerianTech"],
  },
  {
    week: 6,
    date: "2026-04-28",
    title: "DM outreach campaign — 20 fintech CTOs/founders",
    url: "https://brightatsighi.vercel.app/lab/fintech",
    linkedinPost: ``,
    xPost: ``,
    manualSteps: [
      "DM these 20 targets on LinkedIn (use the DM template in the 90-day strategy doc):",
      "1. Tosin Eniolorunda – CEO, TeamApt/Moniepoint",
      "2. Babatunde Obrimah – COO, Fintech Assoc. of Nigeria",
      "3. Adia Sowho – CMO, MTN Nigeria (fintech angle)",
      "4. Akin Jones – CEO, Brass",
      "5. Odun Eweniyi – COO, PiggyVest",
      "6. Eric Idiahi – Partner, Verod Capital",
      "7. Dayo Koleowo – Co-founder, Lendsqr",
      "8. Prosper Otemuyiwa – Developer evangelist (tech influencer, Nigeria)",
      "9. Lanre Orekoya – Engineering Manager at Paystack",
      "10. Olumide Soyombo – Investor, Voltron Capital",
      "11. Osarumen Osamuyi – Writer, The Subtext (African tech media)",
      "12. David Adeleke – CTO, FairMoney Nigeria",
      "13. Uche Pedro – CEO, BellaNaija (for content angle)",
      "14. Yele Bademosi – CEO, Nestcoin/Bundle Africa",
      "15. Kola Aina – Founding Partner, Ventures Platform",
      "ALSO: Search LinkedIn for 'CTO' + 'Nigeria' + 'Fintech' filtered to 2nd-degree connections",
    ],
    tags: [],
  },
  {
    week: 8,
    date: "2026-05-12",
    title: "Pitch Techpoint / TechCabal for guest post",
    url: "https://brightatsighi.vercel.app/lab/fintech",
    linkedinPost: ``,
    xPost: ``,
    manualSteps: [
      "Email pitch to: editor@techpoint.africa / editorial@techcabal.com",
      "Subject: Guest Piece — Building a Real-Time Compliance Engine for Nigerian Fintechs",
      "Body: (from 90-day strategy doc)",
      "Also DM @TechpointAfrica and @Techcabal on Twitter with a 1-line hook",
      "CC in your working demo URL: https://brightatsighi.vercel.app/lab/fintech",
    ],
    tags: [],
  },
  {
    week: 12,
    date: "2026-06-09",
    title: "Post consulting offer publicly",
    url: "https://brightatsighi.vercel.app",
    linkedinPost: `Over the last 90 days I've:

→ Built a live AI compliance engine for fintech
→ Shipped an automated intelligence platform
→ Published 12 briefs on tech, policy, and AI in Africa

I'm now taking 2 consulting engagements for Q3.

I build: AI-augmented backend systems, compliance layers, automated content platforms, and EdTech infrastructure.

If you're a fintech, EdTech, or media company with a problem that needs an engineer who can ship — DM me.`,
    xPost: `Taking 2 consulting clients for Q3.

I build AI-augmented systems:
→ Compliance engines
→ Intelligence platforms
→ EdTech infra

Live demos at https://brightatsighi.vercel.app/lab

DM open.`,
    manualSteps: [
      "Post LinkedIn first thing in the morning — 8:00 AM gets highest organic reach",
      "Reply to every comment within 2 hours",
      "Pin the post to your LinkedIn profile",
    ],
    tags: ["#Consulting #SoftwareEngineering #AIEngineering #NigerianTech #OpenToWork"],
  },
];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function sendReminderEmail(
  type: "prep" | "action",
  action: ScheduledAction
) {
  const isPrep = type === "prep";
  const subjectPrefix = isPrep ? "🟡 [PREP]" : "🟢 [ACTION]";
  const subject = `${subjectPrefix} ${action.title}`;

  const html = isPrep
    ? buildPrepEmail(action)
    : buildActionEmail(action);

  await transporter.sendMail({
    from: `"Eagle Eye Agent" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject,
    html,
  });
}

function buildPrepEmail(a: ScheduledAction): string {
  return `
<div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #ffffff; padding: 32px; max-width: 600px; border: 1px solid #1a1a1a; border-radius: 12px;">
  <div style="border-left: 3px solid #f59e0b; padding-left: 16px; margin-bottom: 24px;">
    <p style="color: #f59e0b; font-size: 10px; letter-spacing: 0.3em; margin: 0; text-transform: uppercase;">EAGLE EYE // TONIGHT'S PREP</p>
    <h2 style="color: #ffffff; margin: 8px 0 0; font-size: 18px;">${a.title}</h2>
    <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">Action date: ${a.date} | Week ${a.week}</p>
  </div>

  <div style="margin-bottom: 24px;">
    <p style="color: #f59e0b; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 8px;">MANUAL STEPS TO PREP TONIGHT</p>
    <ul style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 13px; line-height: 1.8;">
      ${a.manualSteps.map((s) => `<li>${s}</li>`).join("")}
    </ul>
  </div>

  <div style="background: #111; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 8px;">LIVE URL</p>
    <a href="${a.url}" style="color: #008751; font-size: 13px;">${a.url}</a>
  </div>

  ${a.tags.length > 0 ? `
  <div>
    <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 8px;">HASHTAGS TO COPY</p>
    <p style="color: #ccff00; font-size: 12px;">${a.tags.join(" ")}</p>
  </div>` : ""}

  <hr style="border: none; border-top: 1px solid #1f2937; margin: 24px 0;" />
  <p style="color: #374151; font-size: 10px; text-align: center; margin: 0;">Eagle Eye Agent // brightatsighi.vercel.app // This message was auto-generated by your cron system</p>
</div>`;
}

function buildActionEmail(a: ScheduledAction): string {
  return `
<div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #ffffff; padding: 32px; max-width: 600px; border: 1px solid #1a1a1a; border-radius: 12px;">
  <div style="border-left: 3px solid #008751; padding-left: 16px; margin-bottom: 24px;">
    <p style="color: #008751; font-size: 10px; letter-spacing: 0.3em; margin: 0; text-transform: uppercase;">EAGLE EYE // POST NOW</p>
    <h2 style="color: #ccff00; margin: 8px 0 0; font-size: 18px;">${a.title}</h2>
    <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">Week ${a.week} | ${a.date}</p>
  </div>

  ${a.linkedinPost ? `
  <div style="background: #111; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <p style="color: #008751; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 8px;">LINKEDIN POST (COPY → PASTE)</p>
    <pre style="color: #e5e7eb; font-size: 13px; white-space: pre-wrap; margin: 0; font-family: inherit;">${a.linkedinPost}</pre>
  </div>` : ""}

  ${a.xPost ? `
  <div style="background: #111; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
    <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 8px;">X / TWITTER POST (COPY → PASTE)</p>
    <pre style="color: #e5e7eb; font-size: 13px; white-space: pre-wrap; margin: 0; font-family: inherit;">${a.xPost}</pre>
  </div>` : ""}

  ${a.manualSteps.length > 0 ? `
  <div style="margin-bottom: 16px;">
    <p style="color: #f59e0b; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 8px;">MANUAL STEPS</p>
    <ol style="margin: 0; padding-left: 20px; color: #d1d5db; font-size: 13px; line-height: 1.8;">
      ${a.manualSteps.map((s) => `<li>${s}</li>`).join("")}
    </ol>
  </div>` : ""}

  ${a.tags.length > 0 ? `
  <div style="background: #111; border: 1px solid #1f2937; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
    <p style="color: #6b7280; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; margin: 0 0 6px;">HASHTAGS</p>
    <p style="color: #ccff00; font-size: 12px; margin: 0;">${a.tags.join(" ")}</p>
  </div>` : ""}

  <hr style="border: none; border-top: 1px solid #1f2937; margin: 24px 0;" />
  <p style="color: #374151; font-size: 10px; text-align: center; margin: 0;">Eagle Eye Agent // brightatsighi.vercel.app</p>
</div>`;
}
