import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    /*
      ! experimental_ppr
      * CanaryOnlyError: The experimental feature "experimental.ppr" can only be enabled when using the latest canary version of Next.js.
      `pnpm add next@canary`
    */
    ppr: 'incremental',
  },
};

export default nextConfig;
