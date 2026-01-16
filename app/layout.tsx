import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import FloatingChat from "@/components/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brightatsighi.vercel.app"),
  title: {
    default: "Bright Atsighi | Senior Full Stack Engineer",
    template: "%s | Bright Atsighi",
  },
  description:
    "Senior Full Stack Engineer specializing in scalable backend architectures, fintech integrations, and DevOps.",
  openGraph: {
    title: "Bright Atsighi | Senior Full Stack Engineer",
    description:
      "Senior Full Stack Engineer specializing in scalable backend architectures, fintech integrations, and DevOps.",
    url: "https://brightatsighi.vercel.app",
    siteName: "Bright Atsighi Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bright Atsighi | Senior Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bright Atsighi | Senior Full Stack Engineer",
    description:
      "Specializing in scalable backend architectures and fintech integrations.",
    images: ["/opengraph-image.png"],
    creator: "@brytebee",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <FloatingChat />
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
