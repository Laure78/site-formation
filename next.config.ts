import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/formation-ia-btp', destination: '/formations', permanent: false },
    ];
  },
};

export default nextConfig;
