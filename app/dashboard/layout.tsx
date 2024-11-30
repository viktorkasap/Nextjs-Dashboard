/*
    ! experimental_ppr
    * CanaryOnlyError: The experimental feature "experimental.ppr" can only be enabled when using the latest canary version of Next.js.
    `pnpm add next@canary`
*/

//

// eslint-disable-next-line camelcase
export const experimental_ppr = true;

export { DashboardLayout as default, metadata } from '@/app/layouts/dashboard';
