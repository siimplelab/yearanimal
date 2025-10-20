import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  detectLanguage,
  getLanguageFromPath,
} from '@/lib/utils/language-detection';
import {
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_COOKIE_MAX_AGE,
  SUPPORTED_LANGUAGES
} from '@/lib/constants/countries';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.includes('.') || // Has file extension
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the path already has a language prefix
  const pathLanguage = getLanguageFromPath(pathname);

  // If path has a valid language, ensure cookie is set and continue
  if (pathLanguage) {
    const response = NextResponse.next();

    // Set cookie to remember this language preference
    response.cookies.set(LANGUAGE_COOKIE_NAME, pathLanguage, {
      maxAge: LANGUAGE_COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // Add detection headers for debugging (optional)
    const country = request.headers.get('x-vercel-ip-country');
    if (country) {
      response.headers.set('x-detected-country', country);
    }

    return response;
  }

  // Root path or path without language - detect and redirect
  if (pathname === '/' || !SUPPORTED_LANGUAGES.some(lang => pathname.startsWith(`/${lang}`))) {
    const { language, detectionMethod } = detectLanguage(request);

    // Build the redirect URL with detected language
    const url = request.nextUrl.clone();

    // Handle root path
    if (pathname === '/') {
      url.pathname = `/${language}`;
    } else {
      // Add language prefix to existing path
      url.pathname = `/${language}${pathname}`;
    }

    // Create redirect response
    const response = NextResponse.redirect(url, { status: 307 }); // Temporary redirect

    // Set cookie to remember this preference
    response.cookies.set(LANGUAGE_COOKIE_NAME, language, {
      maxAge: LANGUAGE_COOKIE_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // Add headers for debugging (optional)
    response.headers.set('x-detection-method', detectionMethod);
    const country = request.headers.get('x-vercel-ip-country');
    if (country) {
      response.headers.set('x-detected-country', country);
    }

    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.).*)',
  ],
};