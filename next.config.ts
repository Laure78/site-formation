import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/formation-ia-btp', destination: '/formations', permanent: false },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp',
        destination: '/checklist-prompts-btp',
        permanent: true,
      },
      {
        source: '/documents/checklist-10-prompts-chatgpt-btp.html',
        destination: '/checklist-prompts-btp',
        permanent: true,
      },
      {
        source: '/formations/ia-productivite-chantier',
        destination: '/formations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
