import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/chat": ["./knowledge/**/*.md"],
  },
};

export default nextConfig;
