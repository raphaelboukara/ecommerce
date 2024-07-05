import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { apiAuthPrefix, authRoutes, privateRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL('/', nextUrl));
  }

  if (isPrivateRoute && !isLoggedIn) {
    const redirectUrl = new URL('/auth/login', nextUrl);
    redirectUrl.searchParams.set('from', nextUrl.href);
    return Response.redirect(redirectUrl);
  }

  return;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
