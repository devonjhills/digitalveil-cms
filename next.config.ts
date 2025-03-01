import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
    // Alternatively, you can use unoptimized images
    // unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
