import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  async redirects() {
    return [
      // Short-link redirects for sharing
      { source: "/intel", destination: "/intelligence", permanent: true },
      {
        source: "/intel/:path*",
        destination: "/intelligence/:path*",
        permanent: true,
      },
      { source: "/fintech", destination: "/lab/fintech", permanent: true },
      // { source: "/lab", destination: "/lab", permanent: false }, // already exists, kept for clarity
    ];
  },
};

export default nextConfig;
