import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/listening/words", destination: "/listening", permanent: true }];
  },
};

export default nextConfig;
