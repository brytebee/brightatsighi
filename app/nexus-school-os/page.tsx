import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { portfolioData } from "@/lib/data";
import ScrollReveal from "@/components/ScrollReveal";
import ROICalculator from "@/components/nexus/ROICalculator";

export const metadata: Metadata = {
  title:
    "Nexus School OS | Bank-Grade School Management for Nigerian Private Schools",
  description:
    "Nexus School OS is the offline-first school management system built for premium Nigerian private schools. Automate grading, generate 500 report cards in 4 seconds, and eliminate grade manipulation — with zero internet dependency.",
  keywords: [
    "school management software Nigeria",
    "offline school system Nigeria",
    "report card generator Nigeria",
    "private school software Lagos",
    "school grading system Nigeria",
    "Nexus School OS",
    "edtech Nigeria",
  ],
  authors: [{ name: "Bright Atsighi", url: "https://brytebee.com" }],
  openGraph: {
    title:
      "Nexus School OS | Bank-Grade School Management for Nigerian Private Schools",
    description:
      "Automate grading, generate 500 report cards in 4 seconds, and eliminate grade manipulation — with zero internet dependency.",
    url: "https://brytebee.com/nexus-school-os",
    siteName: "Nexus School OS",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus School OS | Offline-First School Management for Nigeria",
    description:
      "Process 500 report cards in 4 seconds. No internet required. Built for premium Nigerian private schools.",
    creator: "@brytebee",
  },
  alternates: {
    canonical: "https://brytebee.com/nexus-school-os",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Icons ───────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Page Component ──────────────────────────────────────────────────
export default function NexusLandingPage() {
  const whatsapp = portfolioData.chatData.whatsapp;

  return (
    <div
      className="min-h-screen text-white bg-[#05081A] selection:bg-[#1A237E] selection:text-white overflow-x-hidden"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ── Force Inter from Google Fonts ── */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* ── Scroll Reveal: useEffect-based IntersectionObserver ── */}
      <ScrollReveal />

      {/* ── Navigation ─────────────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[#05081A]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1A237E] text-sm font-black tracking-tighter">
              N
            </div>
            <span className="text-[13px] font-bold tracking-[-0.01em] sm:text-[15px] sm:tracking-[-0.02em]">
              NEXUS SCHOOL OS
            </span>
          </div>
          {/* Hidden on xs to avoid overlap with global theme toggle */}
          <Link
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.12] px-5 py-2 text-[13px] font-semibold text-white/90 transition-all hover:bg-white/[0.13] hover:border-white/20"
          >
            Request Demo
          </Link>
        </div>
      </nav>

      <main>
        {/* ── Section 1: Hero ────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center pt-[72px] overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-[#1A237E] opacity-[0.07] blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 -right-32 h-[500px] w-[500px] rounded-full bg-[#00E676] opacity-[0.04] blur-[140px] pointer-events-none" />

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
              {/* Copy */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span
                    data-reveal
                    className="reveal-item inline-flex w-fit items-center rounded-full border border-[#8C9EFF]/25 bg-[#8C9EFF]/10 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-[#8C9EFF] uppercase"
                    style={{ transitionDelay: "0ms" }}
                  >
                    The Gold Standard in Nigerian Education
                  </span>
                  <h1
                    data-reveal
                    className="reveal-item text-[52px] font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-[68px] lg:text-[82px] xl:text-[96px]"
                    style={{ transitionDelay: "80ms" }}
                  >
                    Command &
                    <br />
                    Control.{" "}
                    <span className="bg-gradient-to-r from-white via-[#c7cfff] to-[#8C9EFF] bg-clip-text text-transparent">
                      Zero Internet
                      <br className="hidden sm:block" /> Required.
                    </span>
                  </h1>
                </div>

                <p className="max-w-[480px] text-[17px] leading-[1.7] text-[#8C9EFF]/90 nexus-fade-in nexus-fade-in-delay-3">
                  Nexus School OS is the offline-first nervous system for
                  premium private schools. Take absolute command of your records.
                  Eliminate your printing budget. Process 500 report cards in
                  exactly 4 seconds — without the internet.
                </p>

                <div className="flex flex-col gap-3 nexus-fade-in nexus-fade-in-delay-4">
                  <Link
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nexus-breathe inline-flex w-fit items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <WhatsAppIcon />
                    Chat with Founder on WhatsApp
                  </Link>
                  <span className="text-[12px] text-[#8C9EFF]/60 tracking-wide">
                    Hardware limits apply — only 10 integration slots remaining.
                  </span>
                </div>
              </div>

              {/* Phone Simulator */}
              <div
                data-reveal
                className="reveal-item relative flex justify-center lg:justify-end"
                style={{ transitionDelay: "120ms" }}
              >
                <div className="absolute inset-0 rounded-full bg-[#1A237E] opacity-20 blur-[100px]" />
                <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px]">
                  <div className="rounded-[52px] border-[10px] border-white/[0.07] bg-[#05081A] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">
                    <iframe
                      src="/assets/nexus-app-simulator.html"
                      width="100%"
                      height="800"
                      className="rounded-[44px] border-none bg-transparent"
                      scrolling="no"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 1.5: ROI Auditor ────────────────────────── */}
        <section className="py-24 bg-[#05081A] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div data-reveal className="reveal-item mb-16 text-center">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#8C9EFF] uppercase">
                The Financial Audit
              </span>
              <h2 className="mt-3 text-[32px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[42px]">
                Manual Grading is Leaking Your Revenue.
                <br />
                <span className="text-[#00E676]">Calculate your recovery.</span>
              </h2>
            </div>
            <div data-reveal className="reveal-item" style={{ transitionDelay: "100ms" }}>
              <ROICalculator />
            </div>
          </div>
        </section>

        {/* ── Trust Banner ───────────────────────────────────── */}
        <section className="border-y border-white/[0.06] bg-white/[0.02] py-7 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#8C9EFF]/60 uppercase shrink-0">
              Built exclusively for
            </span>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-10">
              {[
                { color: "bg-blue-500/70", label: "Elite Proprietary Schools" },
                { color: "bg-[#00E676]/70", label: "Premier Charter Networks" },
                { color: "bg-purple-500/70", label: "Tech-Forward Principals" },
              ].map(({ color, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[13px] font-semibold text-white/70"
                >
                  <span className={`h-2 w-2 rounded-full ${color}`} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: Core Pains ──────────────────────────── */}
        <section className="py-24 sm:py-32 lg:py-40 relative">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div data-reveal className="reveal-item mb-16 sm:mb-20 text-center">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00E676] uppercase">
                The Problem
              </span>
              <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[56px]">
                Nigerian Schools Run on Trust.
                <br />
                <span className="text-[#8C9EFF]">
                  Don&rsquo;t Lose It To an Excel Sheet.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                {
                  emoji: "🛑",
                  bg: "bg-[#1A237E]/15",
                  title: "The End of Grade Manipulation",
                  body: "Every grade entered is timestamped, locked to a specific teacher's biometric fingerprint, and secured in an encrypted local vault. The truth is never negotiable.",
                  delay: "0ms",
                },
                {
                  emoji: "💸",
                  bg: "bg-[#00E676]/10",
                  title: "Sanctity From Data Costs",
                  body: "Why pay exorbitant monthly cloud fees? Nexus uses localised pairing tech. Teachers sync results directly to the Principal's laptop over free local Wi-Fi.",
                  delay: "100ms",
                },
                {
                  emoji: "🖨️",
                  bg: "bg-[#1A237E]/15",
                  title: "Zero Manual Computation",
                  body: "Teachers enter raw scores. Nexus calculates positions, handles ties instantly, and generates print-ready PDF report cards for the entire school in 4 seconds.",
                  delay: "200ms",
                },
              ].map(({ emoji, bg, title, body, delay }) => (
                <div
                  data-reveal
                  key={title}
                  className="reveal-item group rounded-[28px] border border-white/[0.07] bg-white/3 p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
                  style={{ transitionDelay: delay }}
                >
                  <div
                    className={`mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${bg} text-2xl transition-transform duration-300 group-hover:scale-110`}
                  >
                    {emoji}
                  </div>
                  <h3 className="mb-3 text-[20px] font-bold tracking-[-0.02em] leading-snug">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#8C9EFF]/85">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── New Section: Institutional Sovereignty ─────────── */}
        <section className="py-24 sm:py-32 bg-gradient-to-b from-[#05081A] to-black relative">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#8C9EFF] uppercase">
                  Institutional Sovereignty
                </span>
                <h2 className="mt-4 text-[40px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[52px]">
                  Your Data. Your Campus.
                  <br />
                  <span className="text-[#00E676]">Total Control.</span>
                </h2>
                <div className="mt-8 space-y-8">
                  <div className="flex gap-4 border-l-2 border-[#1A237E] pl-6 py-2 bg-gradient-to-r from-[#1A237E]/5 to-transparent">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-[#1A237E]/20 flex items-center justify-center text-[#8C9EFF]">
                      <CheckIcon />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-tight">Zero-Knowledge Backups</h4>
                      <p className="text-sm text-[#8C9EFF]/70 leading-relaxed">Encrypted local backups that even we cannot access. Your financial and academic records remain entirely your property.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 border-l-2 border-[#00E676]/30 pl-6 py-2 bg-gradient-to-r from-[#00E676]/5 to-transparent">
                    <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-[#00E676]/20 flex items-center justify-center text-[#00E676]">
                      <CheckIcon />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-tight">Local-to-Cloud Shield</h4>
                      <p className="text-sm text-[#8C9EFF]/70 leading-relaxed">Conduct exams and grading 100% offline. Sync to your private cloud vault only when you choose to connect, via encrypted handshake.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-video rounded-[32px] border border-white/5 bg-white/[0.02] flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[#1A237E]/10 blur-[100px] rounded-full scale-150 animate-pulse" />
                <div className="relative z-10 text-center p-8 backdrop-blur-sm border border-white/10 rounded-3xl bg-white/[0.01]">
                  <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#05081A] border border-white/10 shadow-[0_0_50px_rgba(26,35,126,0.5)]">
                    <svg className="h-12 w-12 text-[#00E676]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tighter">Security Audit Verified</h3>
                  <p className="mt-2 text-sm text-[#8C9EFF]/60">Nexus Architecture uses military-grade SQLCipher <br /> and hardware-bound biometric authentication.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: How It Works ────────────────────────── */}
        <section className="py-24 sm:py-32 lg:py-40 bg-gradient-to-b from-white/[0.01] to-transparent">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div data-reveal className="reveal-item mb-16 sm:mb-24">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00E676] uppercase">
                How It Works
              </span>
              <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[56px]">
                Three Steps.
                <br />
                <span className="text-[#8C9EFF]">Total School Domination.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
              {/* Step 1 */}
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1A237E] text-[13px] font-black text-[#8C9EFF] tracking-tight">
                    01
                  </div>
                  <h3 className="text-[30px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[36px]">
                    Pair Teachers Instantly.
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-[#8C9EFF]/85">
                    Admin uploads the student roster. Teachers point their phone
                    at the Admin laptop. The system pairs their hardware,
                    downloads their specific class, and locks the data behind
                    their personal fingerprint.
                  </p>
                </div>
                <div className="aspect-video overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/3 relative">
                  <Image
                    src="/images/deal.jpg"
                    alt="Admin and teacher pairing their devices for Nexus setup"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081A]/75 via-transparent to-[#05081A]/15" />
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                    <span className="rounded-full border border-white/[0.15] bg-[#05081A]/75 px-4 py-1.5 text-[11px] font-mono font-semibold tracking-widest text-[#8C9EFF] backdrop-blur-sm uppercase">
                      Nexus Pairing Protocol: Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="order-2 lg:order-1 aspect-video overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/3 flex items-center justify-center p-8">
                  <div className="w-full max-w-sm space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-2.5">
                      <span className="text-[12px] font-medium text-[#8C9EFF]/70">
                        Grading Mode
                      </span>
                      <span className="rounded-full bg-[#00E676]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#00E676]">
                        OFFLINE
                      </span>
                    </div>
                    {[
                      { name: "Mathematics CI", score: 85 },
                      { name: "English Language", score: 92 },
                      { name: "Biology Mid-Term", score: 78 },
                      { name: "Physics Practical", score: 95 },
                    ].map(({ name, score }) => (
                      <div
                        key={name}
                        className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 border border-white/[0.05]"
                      >
                        <span className="text-[13px] text-white/70">
                          {name}
                        </span>
                        <span className="font-mono text-[14px] font-bold text-[#00E676]">
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2 flex flex-col gap-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1A237E] text-[13px] font-black text-[#8C9EFF] tracking-tight">
                    02
                  </div>
                  <h3 className="text-[30px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[36px]">
                    Grade From Anywhere.
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-[#8C9EFF]/85">
                    Our proprietary &ldquo;Focus Mode&rdquo; lets teachers grade
                    entirely offline — on their bus ride, during prep, or at
                    home. No data bundles, no network failures, no excuses.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div className="flex flex-col gap-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1A237E] text-[13px] font-black text-[#8C9EFF] tracking-tight">
                    03
                  </div>
                  <h3 className="text-[30px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[36px]">
                    Perfection in 4 Seconds.
                  </h3>
                  <p className="text-[16px] leading-[1.7] text-[#8C9EFF]/85">
                    Upload your termly logos and the Principal&rsquo;s digital
                    signature once. Click &lsquo;Generate&rsquo; and watch a
                    folder of beautiful, branded, pristine report cards
                    materialise on your desktop.
                  </p>
                </div>
                <div className="aspect-video overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/3 relative">
                  <Image
                    src="/images/done.jpg"
                    alt="A school using Nexus to generate perfect report cards in seconds"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05081A]/75 via-transparent to-[#05081A]/25" />
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center">
                    <span className="rounded-full border border-[#00E676]/30 bg-[#05081A]/75 px-4 py-1.5 text-[11px] font-mono font-bold tracking-widest text-[#00E676] backdrop-blur-sm uppercase">
                      521 PDF Reports Generated ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Tech Flex ───────────────────────────── */}
        <section className="py-24 sm:py-32 lg:py-40 bg-black">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-16 sm:mb-20">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00E676] uppercase">
                Engineering Excellence
              </span>
              <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[52px]">
                Military-Grade Infrastructure,
                <br />
                Built for the Principal&rsquo;s Desk.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {[
                {
                  icon: "🛡️",
                  title: "Never Lose a Device to Heat",
                  body: 'The "Eco-Guardian Protocol" monitors device temperature in real-time. It breathes green when safe and pauses sync if a teacher\'s phone overheats — protecting their personal hardware investment.',
                },
                {
                  icon: "🔐",
                  title: "Absolute Data Sovereignty",
                  body: "Protected by standard encryption and SQLCipher. Data at rest is encrypted so deeply that even if a device is stolen, the internal student data is utterly inaccessible.",
                },
                {
                  icon: "📡",
                  title: "Instant Sync, Zero Waiting",
                  body: 'No more "loading..." spinners during staff meetings. 1,000 grades sync across a room in under 350 milliseconds over a private local area network. Total efficiency.',
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-4">
                  <span className="text-[28px]">{icon}</span>
                  <h4 className="text-[18px] font-bold tracking-[-0.02em]">
                    {title}
                  </h4>
                  <p className="text-[15px] leading-[1.7] text-[#8C9EFF]/80">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Pricing Plans ───────────────────────── */}
        <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-[#1A237E] opacity-[0.08] blur-[160px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-5 sm:px-8 relative z-10">
            <div className="mb-16 sm:mb-20 text-center">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00E676] uppercase">
                Institutional Investment
              </span>
              <h2 className="mt-3 text-[36px] font-black leading-[1.1] tracking-[-0.03em] sm:text-[48px] lg:text-[52px]">
                A Partnership That Grows With You.
              </h2>
              <p className="mt-4 text-[17px] leading-[1.7] text-[#8C9EFF]/80 max-w-md mx-auto">
                Pay per student, per term — aligning our success directly with yours.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center md:px-8 lg:px-0">
              {/* Silver */}
              <div className="flex flex-col gap-7 rounded-[28px] border border-white/[0.09] bg-white/3 p-10 backdrop-blur-xl h-full transition-all hover:border-white/20">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#8C9EFF] uppercase mb-2">
                    Silver School
                  </p>
                  <h3 className="text-[20px] font-bold tracking-[-0.02em] leading-snug">
                    Result Processing Excellence
                  </h3>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[42px] font-black tracking-[-0.04em]">
                      ₦300
                    </span>
                    <span className="text-[13px] text-[#8C9EFF]/70">
                      /student/S3
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase font-bold tracking-widest text-[#8C9EFF]/40">
                    Sovereign Support Shield
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 text-[14px] text-[#8C9EFF]/80">
                  {[
                    "Grading & Ranking Engine",
                    "Branded Report Card Generation",
                    "Official School Stamp Module",
                    "Standard Result Templates",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="text-[#00E676]">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 text-white/50 font-medium text-[12px] mt-2 italic">
                    Focus: Essential Academic Operations
                  </li>
                </ul>
                <div className="mt-auto pt-6 border-t border-white/[0.07]">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#8C9EFF]/40 mb-3">
                    Institutional Onboarding (IDT)
                  </p>
                  <p className="text-[20px] font-black text-white/90 mb-4">₦100,000</p>
                  <Link
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full border border-white/[0.15] py-3 text-center text-[14px] font-semibold text-white/80 transition-all hover:border-[#8C9EFF]/50 hover:text-[#8C9EFF]"
                  >
                    Deploy Silver
                  </Link>
                </div>
              </div>

              {/* Gold — Most Popular */}
              <div className="nexus-gold-pulse relative flex flex-col gap-7 rounded-[32px] border border-[#1A237E] bg-[#0d1240] p-10 backdrop-blur-xl md:scale-[1.05] h-full shadow-[0_0_60px_rgba(26,35,126,0.3)]">
                <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="rounded-full border border-[#8C9EFF]/30 bg-[#1A237E] px-4 py-1.5 text-[11px] font-extrabold tracking-[0.15em] uppercase text-white shadow-lg">
                    ⭐ THE CONNECTED SCHOOL
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#8C9EFF] uppercase mb-2">
                    Gold School
                  </p>
                  <h3 className="text-[20px] font-bold tracking-[-0.02em] leading-snug">
                    Parental Engagement & Mobility
                  </h3>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[42px] font-black tracking-[-0.04em]">
                      ₦500
                    </span>
                    <span className="text-[13px] text-[#8C9EFF]/70">
                      /student/S3
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase font-bold tracking-widest text-[#8C9EFF]/40 text-[#8C9EFF]/60">
                    Sovereign Support Shield
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 text-[14px] text-[#8C9EFF]/80">
                  {[
                    "Everything in Silver",
                    "Parental Access Portal",
                    "Mobile Admin Command App",
                    "Fee Management Ledger",
                    "Digital Assignment Hub",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="text-[#00E676]">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 text-[#00E676] font-bold text-[12px] mt-2 italic">
                    Focus: Satisfaction & Revenue Tracking
                  </li>
                </ul>
                <div className="mt-auto pt-6 border-t border-white/[0.1]">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#8C9EFF]/40 mb-3">
                    Institutional Onboarding (IDT)
                  </p>
                  <p className="text-[20px] font-black text-white/90 mb-4">₦150,000</p>
                  <Link
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-[#1A237E] py-3 text-center text-[14px] font-bold text-white transition-all hover:bg-[#232db0] hover:shadow-[0_0_30px_rgba(26,35,126,0.5)]"
                  >
                    Upgrade to Gold
                  </Link>
                </div>
              </div>

              {/* Diamond */}
              <div className="flex flex-col gap-7 rounded-[28px] border border-white/[0.09] bg-white/3 p-10 backdrop-blur-xl h-full transition-all hover:border-white/20">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#8C9EFF] uppercase mb-2">
                    Diamond School
                  </p>
                  <h3 className="text-[20px] font-bold tracking-[-0.02em] leading-snug">
                    Intelligence & Exam Sovereignty
                  </h3>
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[42px] font-black tracking-[-0.04em]">
                      ₦1,000
                    </span>
                    <span className="text-[13px] text-[#8C9EFF]/70">
                      /student/S3
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase font-bold tracking-widest text-[#8C9EFF]/40">
                    Sovereign Support Shield
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 text-[14px] text-[#8C9EFF]/80">
                  {[
                    "Everything in Gold",
                    "Offline Local CBT (Zero Internet)",
                    "Exam Analytics & Success Radar",
                    "Encrypted Google Drive Backups",
                    "Multi-Campus Central Hub",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="text-[#00E676]">
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 text-purple-400 font-bold text-[12px] mt-2 italic">
                    Focus: Academic Dominance & Scale
                  </li>
                </ul>
                <div className="mt-auto pt-6 border-t border-white/[0.07]">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-[#8C9EFF]/40 mb-3">
                    Institutional Onboarding (IDT)
                  </p>
                  <p className="text-[20px] font-black text-white/90 mb-4">₦250,000</p>
                  <Link
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full border border-white/[0.15] py-3 text-center text-[14px] font-semibold text-white/80 transition-all hover:border-[#8C9EFF]/50 hover:text-[#8C9EFF]"
                  >
                    Go Diamond
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-14 text-center text-[13px] leading-[1.7] text-[#8C9EFF]/55 max-w-xl mx-auto">
              Sovereign Support Shield (S3) is payable termly at resumption. IDT includes server configuration, biometric pairing, and staff training.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#00E676]/25 bg-[#00E676]/[0.07] px-6 py-3 text-[13px] text-[#00E676] font-semibold backdrop-blur-md">
                <span className="text-[18px]">👑</span>
                <span>
                  <strong>Founder Cohort — First 10 schools only:</strong>{" "}
                  20-30% (plan-based) IDT discount. Lock in your rate before public launch.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section: The Ownership Question ────────────────── */}
        <section className="py-24 sm:py-32 bg-[#02040d]">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
            <h2 className="text-[32px] font-black tracking-[-0.03em] sm:text-[42px] mb-8">
              &ldquo;Can we just pay once and own it?&rdquo;
            </h2>
            <div className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 text-left space-y-6">
              <p className="text-[#8C9EFF]/90 leading-[1.8]">
                In the digital age, &ldquo;owning&rdquo; static software is a liability. Your hardware evolves, security threats morph, and grading standards shift. 
              </p>
              <div className="h-[1px] w-full bg-white/5" />
              <p className="text-[#8C9EFF]/90 leading-[1.8]">
                A partnership with Nexus through the <span className="text-white font-bold">Sovereign Support Shield (S3)</span> ensures you aren&rsquo;t just buying code, but a <span className="text-[#00E676] font-bold">Guaranteed Success Protocol</span>. We carry the technical liability for your data integrity and system uptime. 
              </p>
              <p className="text-sm font-semibold text-white/70 italic">
                If a standalone system crashes on Result Day, you are on your own. With S3, we are in the room with you.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 6: Final CTA ───────────────────────────── */}
        <section
          id="contact"
          className="py-24 sm:py-32 lg:py-48 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[#1A237E] opacity-[0.18] blur-[160px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[#00E676] opacity-[0.04] blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-5xl px-5 sm:px-8 relative z-10 text-center">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#8C9EFF]/70 uppercase">
              The Final Call
            </span>
            <h2 className="mt-4 text-[40px] font-black leading-[1.05] tracking-[-0.03em] sm:text-[56px] lg:text-[72px] xl:text-[80px]">
              Stop Renting Out Your
              <br />
              School&rsquo;s Most Valuable Asset.
            </h2>
            <p className="mt-6 text-[18px] leading-[1.7] text-[#8C9EFF]/80 max-w-md mx-auto">
              Take complete ownership of your school&rsquo;s data. Today.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="nexus-breathe inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-5 text-[17px] font-bold text-white transition-all hover:scale-[1.04] active:scale-[0.97] sm:px-12 sm:text-[20px]"
              >
                <WhatsAppIcon />
                Chat with Founder on WhatsApp
              </Link>
              <p className="max-w-sm text-[13px] leading-[1.7] text-[#8C9EFF]/50 italic">
                &ldquo;Nexus is currently accepting only 10 charter schools for
                the upcoming academic term — white-glove onboarding guaranteed.
                Secure your position now.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] bg-[#020510]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {/* Brand */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1A237E] text-xs font-black">
                  N
                </div>
                <span className="text-[14px] font-bold tracking-[-0.02em]">
                  NEXUS SCHOOL OS
                </span>
              </div>
              <p className="text-[13px] leading-[1.6] text-[#8C9EFF]/60 max-w-[220px]">
                The offline-first nervous system for premium private schools in
                Nigeria.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold tracking-[0.15em] text-[#8C9EFF]/40 uppercase mb-1">
                Quick Links
              </p>
              {[
                { label: "Chat on WhatsApp", href: whatsapp, external: true },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map(({ label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="text-[13px] text-[#8C9EFF]/55 transition-colors hover:text-[#8C9EFF]"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Founder */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-bold tracking-[0.15em] text-[#8C9EFF]/40 uppercase mb-1">
                Built By
              </p>
              <Link
                className="text-[14px] font-semibold text-white/80"
                href="/"
              >
                {portfolioData.personalInfo.name}
              </Link>
              <p className="text-[13px] text-[#8C9EFF]/55">
                {portfolioData.personalInfo.role}
              </p>
              <Link
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/[0.08] px-4 py-1.5 text-[12px] font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/15"
              >
                <WhatsAppIcon />
                Message Founder
              </Link>
            </div>
          </div>

          <div className="mt-12 border-t border-white/[0.05] pt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-[12px] text-[#8C9EFF]/35">
              © 2026 Nexus Infrastructure Ltd. All rights reserved.
            </p>
            <p className="text-[12px] text-[#8C9EFF]/35">
              Built for the elite Nigerian education sector.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
