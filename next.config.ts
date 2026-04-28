import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Vercel deployment
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
