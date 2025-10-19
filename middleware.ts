import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ko'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Enable automatic locale detection
  localeDetection: true
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - . files (e.g. favicon.ico)
    // - _next (Next.js internals)
    // - api, _vercel (API routes and Vercel internals)
    // - static files with extensions
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};