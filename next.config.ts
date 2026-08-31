import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photography is local, served from `public/Images`. No remote hosts.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
