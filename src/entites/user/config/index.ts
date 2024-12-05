import type { NextAuthConfig } from 'next-auth';

const LOGIN_PATH = '/login';
const DASHBOARD_PATH = '/dashboard';

export const authConfig = {
  pages: {
    signIn: LOGIN_PATH,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isPageDashboard = nextUrl.pathname.startsWith(DASHBOARD_PATH);

      if (isPageDashboard) {
        return isLoggedIn; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(DASHBOARD_PATH, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
