import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "api.microlink.io"],
    // Alternatively, you can use unoptimized images
    // unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
