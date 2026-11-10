import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 👈 Allows all HTTPS hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // 👈 Allows all HTTP hostnames (optional)
      },
    ],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
