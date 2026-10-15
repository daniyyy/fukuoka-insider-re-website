import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Public site lives at the domain root (https://fukuoka.house, Danny 2026-10-15).
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
};

export default nextConfig;
