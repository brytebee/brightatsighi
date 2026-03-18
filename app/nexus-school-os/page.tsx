import React from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "@/lib/data";

export default function NexusLandingPage() {
  return (
    <div className="min-h-screen font-sans text-white bg-[#05081A] selection:bg-[#1A237E] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#05081A]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#1A237E] flex items-center justify-center font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold tracking-tight">NEXUS</span>
          </div>
          <Link
            href="#contact"
            className="rounded-full bg-[#1A237E] px-6 py-2.5 text-sm font-semibold transition-all hover:bg-[#1A237E]/80 hover:shadow-[0_0_20px_rgba(26,35,126,0.3)]"
          >
            Request Private Demo
          </Link>
        </div>
      </nav>

      <main>
        {/* Section 1: Hero */}
        <section className="relative flex min-h-screen items-center pt-20 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-[#1A237E] opacity-10 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 h-[400px] w-[400px] rounded-full bg-[#00E676] opacity-5 blur-[120px]" />

          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-extrabold tracking-[0.2em] text-[#8C9EFF] uppercase">
                    The Gold Standard in Nigerian Education
                  </span>
                  <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
                    Bank-Grade Security.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#8C9EFF]">
                      Zero Internet Required.
                    </span>
                  </h1>
                </div>

                <p className="max-w-xl text-lg leading-relaxed text-[#8C9EFF]">
                  Nexus School OS is the offline-first nervous system for
                  premium private schools. End "Grade Expo." Eliminate your
                  printing budget. Process 500 report cards in exactly 4 seconds
                  — without ever connecting to the internet.
                </p>

                <div className="flex flex-col gap-4">
                  <Link
                    href="#contact"
                    className="inline-flex w-fit rounded-full bg-[#1A237E] px-10 py-5 text-xl font-bold transition-all hover:bg-[#1A237E]/80 hover:shadow-[0_0_30px_rgba(26,35,126,0.4)]"
                  >
                    Request Your Private Demo
                  </Link>
                  <span className="text-xs font-medium text-[#8C9EFF]">
                    Hardware limits apply. Book early to secure your integration
                    slot.
                  </span>
                </div>
              </div>

              <div className="relative flex justify-center py-12">
                <div className="absolute inset-0 bg-gradient-radial from-[#1A237E]/20 to-transparent blur-3xl" />
                <div
                  className="relative z-10 w-full max-w-[450px]"
                  style={{
                    transform: "scale(0.9)",
                    transformOrigin: "top center",
                  }}
                >
                  <div className="rounded-[60px] border-[12px] border-white/5 bg-[#05081A] shadow-2xl">
                    <iframe
                      src="/assets/nexus-app-simulator.html"
                      width="100%"
                      height="850"
                      className="rounded-[48px] border-none bg-transparent"
                      scrolling="no"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Trust Banner */}
        <section className="border-y border-white/5 bg-white/[0.02] py-8 backdrop-blur-sm relative z-10">
          <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-sm font-semibold tracking-widest text-[#8C9EFF] uppercase mb-2 sm:mb-0 sm:mr-4 text-center">
              Built exclusively for
            </span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <div className="flex items-center gap-2 font-bold text-md lg:text-lg">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>{" "}
                Elite Proprietary Schools
              </div>
              <div className="flex items-center gap-2 font-bold text-md lg:text-lg">
                <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>{" "}
                Premier Charter Networks
              </div>
              <div className="flex items-center gap-2 font-bold text-md lg:text-lg">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>{" "}
                Forward-Thinking Principals
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Pains */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="mb-24 flex flex-col items-center text-center">
              <h2 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
                Nigerian Schools Run on Trust.
                <br />
                <span className="text-[#8C9EFF]">
                  Don't Lose It To An Excel Sheet.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group relative rounded-[32px] border border-white/5 bg-white/[0.03] p-8 lg:p-10 transition-all hover:bg-white/[0.05] hover:border-white/10 backdrop-blur-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A237E]/20 text-3xl transition-transform group-hover:scale-110">
                  🛑
                </div>
                <h3 className="mb-4 text-2xl font-bold">
                  The End of Grade Manipulation
                </h3>
                <p className="text-[#8C9EFF] leading-relaxed">
                  Every grade entered is timestamped, locked to a specific
                  teacher's biometric fingerprint, and secured in an encrypted
                  local vault. The truth is never negotiable.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-[32px] border border-white/5 bg-white/[0.03] p-8 lg:p-10 transition-all hover:bg-white/[0.05] hover:border-white/10 backdrop-blur-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00E676]/20 text-3xl transition-transform group-hover:scale-110">
                  💸
                </div>
                <h3 className="mb-4 text-2xl font-bold">
                  Sanctity From Data Costs
                </h3>
                <p className="text-[#8C9EFF] leading-relaxed">
                  Why pay exorbitant monthly cloud fees? Nexus uses localized
                  "Marriage" tech. Teachers sync results directly to the
                  Principal's laptop using free local Wi-Fi.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-[32px] border border-white/5 bg-white/[0.03] p-8 lg:p-10 transition-all hover:bg-white/[0.05] hover:border-white/10 backdrop-blur-xl">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A237E]/20 text-3xl">
                  🖨️
                </div>
                <h3 className="mb-4 text-2xl font-bold">
                  Zero Manual Computation
                </h3>
                <p className="text-[#8C9EFF] leading-relaxed">
                  Your teachers enter raw scores. Nexus calculates positions,
                  handles ties instantly, and generates print-ready PDF report
                  cards for the entire school in 4 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section className="py-32 bg-white/[0.01]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-40">
              {/* Step 1 */}
              <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A237E] font-bold text-[#8C9EFF]">
                    01
                  </div>
                  <h3 className="text-4xl font-extrabold">
                    Pair Teachers Instantly.
                  </h3>
                  <p className="text-lg text-[#8C9EFF] leading-relaxed">
                    Admin uploads the student roster. Teachers point their phone
                    at the Admin laptop. The system pairs their hardware,
                    downloads their specific class, and locks the data behind
                    their personal fingerprint.
                  </p>
                </div>
                <div className="aspect-video rounded-[32px] border border-white/5 bg-white/[0.03] flex items-center justify-center overflow-hidden">
                  <div className="text-center p-12">
                    <div className="bg-white p-4 rounded-2xl inline-block mb-6">
                      {/* Deal image */}
                      <Image
                        src="/images/deal.jpg"
                        alt="Nexus Pairing"
                        width={250}
                        height={250}
                      />
                    </div>
                    <p className="text-sm font-mono text-[#8C9EFF]">
                      NEXUS PAIRING PROTOCOL: ACTIVE
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                <div className="order-2 lg:order-1 aspect-video rounded-[32px] border border-white/5 bg-white/[0.03] flex items-center justify-center overflow-hidden">
                  <div className="w-full max-w-md p-8 bg-[#05081A] rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-2 w-32 bg-white/10 rounded-full" />
                      <div className="h-6 w-12 bg-[#00E676]/20 rounded-full" />
                    </div>
                    <div className="space-y-4">
                      {[85, 92, 78, 95].map((score, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                        >
                          <div className="h-2 w-24 bg-white/20 rounded-full" />
                          <div className="font-mono text-[#00E676]">
                            {score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 flex flex-col gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A237E] font-bold text-[#8C9EFF]">
                    02
                  </div>
                  <h3 className="text-4xl font-extrabold">
                    Grade From Anywhere.
                  </h3>
                  <p className="text-lg text-[#8C9EFF] leading-relaxed">
                    Our proprietary "Focus Mode" lets teachers grade offline on
                    their bus ride, during prep, or at home. No bundles, no
                    network failures, no excuses.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
                <div className="flex flex-col gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1A237E] font-bold text-[#8C9EFF]">
                    03
                  </div>
                  <h3 className="text-4xl font-extrabold">
                    Perfection in 4 Seconds.
                  </h3>
                  <p className="text-lg text-[#8C9EFF] leading-relaxed">
                    Upload termly logos and the Principal's digital signature
                    once. Click 'Generate' and watch a folder of beautiful,
                    branded, pristine report cards appear on your desktop.
                  </p>
                </div>
                <div className="aspect-video rounded-[32px] border border-white/5 bg-white/[0.03] flex items-center justify-center overflow-hidden">
                  <div className="bg-white p-4 rounded-2xl inline-block my-6">
                    {/* Done image */}
                    <Image
                      src="/images/done.jpg"
                      alt="Nexus Pairing"
                      width={450}
                      height={450}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Flex */}
        <section className="py-32 bg-black">
          <div className="container mx-auto px-6">
            <div className="mb-20">
              <span className="text-sm font-bold tracking-widest text-[#00E676] uppercase">
                Engineering Excellence
              </span>
              <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
                Military-Grade Infrastructure,
                <br /> Built for the Principal's Desk.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="flex flex-col gap-4">
                <div className="text-2xl">🛡️</div>
                <h4 className="text-xl font-bold">
                  Never Lose a Device to Heat
                </h4>
                <p className="text-[#8C9EFF]">
                  Our "Eco-Guardian Protocol" monitors device temperature in
                  real-time. It breathes green when safe, and pauses sync if a
                  teacher's phone overheats, protecting their personal hardware
                  investment.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl">🔐</div>
                <h4 className="text-xl font-bold">Absolute Data Sovereignty</h4>
                <p className="text-[#8C9EFF]">
                  Protected by standard encryption and SQLCipher. Data at rest
                  is encrypted so deeply that even if a phone is stolen, the
                  internal student data remains utterly inaccessible.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-2xl">📡</div>
                <h4 className="text-xl font-bold">
                  Instant Sync, Zero Waiting
                </h4>
                <p className="text-[#8C9EFF]">
                  No more "loading..." spinners during staff meetings. 1,000
                  grades sync across a room in less than 350 milliseconds over a
                  private local area network. Total efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section id="contact" className="py-40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#1A237E] opacity-20 blur-[150px]" />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="mb-8 text-5xl font-extrabold md:text-7xl">
              Stop Renting Out Your School's
              <br /> Most Valuable Asset.
            </h2>
            <p className="mb-12 text-2xl text-[#8C9EFF]">
              Take ownership of your data today.
            </p>

            <div className="flex flex-col items-center gap-6">
              <Link
                href={portfolioData.chatData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-5 text-lg lg:px-12 lg:py-6 lg:text-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:shadow-[0_0_60px_rgba(37,211,102,0.5)] border border-white/20"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                </svg>
                <span className="relative z-10 leading-none tracking-tight">
                  Chat with Founder on WhatsApp
                </span>
              </Link>
              <p className="max-w-md text-sm text-[#8C9EFF]/80 leading-relaxed italic">
                "Nexus is currently accepting only 10 charter schools for the
                upcoming academic term to ensure white-glove onboarding. Secure
                your position."
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 grayscale opacity-80">
            <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center font-bold text-black text-sm">
              N
            </div>
            <span className="text-sm font-bold tracking-tight">
              NEXUS SCHOOL OS
            </span>
          </div>
          <p className="text-xs text-[#8C9EFF]/70">
            © 2026 Nexus Infrastructure. Built for the elite Nigerian education
            sector.
          </p>
        </div>
      </footer>
    </div>
  );
}
