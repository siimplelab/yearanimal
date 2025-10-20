import { NextRequest } from 'next/server';
import {
  getLanguageFromCountry,
  isSupportedLanguage,
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE_NAME,
  type SupportedLanguage
} from '@/lib/constants/countries';

/**
 * Parse Accept-Language header to get preferred language
 * @param acceptLanguage - Accept-Language header value
 * @returns Preferred supported language or null
 */
export function parseAcceptLanguage(acceptLanguage: string | null): SupportedLanguage | null {
  if (!acceptLanguage) return null;

  // Parse Accept-Language header
  // Example: "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].split('-')[0].toLowerCase(); // Get language part only (ko from ko-KR)
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)

  // Find the first supported language
  for (const { code } of languages) {
    if (isSupportedLanguage(code)) {
      return code;
    }
  }

  return null;
}

/**
 * Get country code from request headers (Vercel deployment)
 * @param request - Next.js request object
 * @returns Country code or null
 */
export function getCountryFromHeaders(request: NextRequest): string | null {
  // Vercel provides geolocation headers
  const country = request.headers.get('x-vercel-ip-country') ||
                  request.headers.get('x-country') ||
                  request.geo?.country ||
                  null;

  return country;
}

/**
 * Get language preference from cookie
 * @param request - Next.js request object
 * @returns Language preference or null
 */
export function getLanguageFromCookie(request: NextRequest): SupportedLanguage | null {
  const cookieValue = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;

  if (cookieValue && isSupportedLanguage(cookieValue)) {
    return cookieValue;
  }

  return null;
}

/**
 * Detect user's preferred language using multiple strategies
 * @param request - Next.js request object
 * @returns Detected language with detection method
 */
export function detectLanguage(request: NextRequest): {
  language: SupportedLanguage;
  detectionMethod: 'cookie' | 'geo' | 'accept-language' | 'default';
} {
  // 1. Check cookie preference (highest priority)
  const cookieLanguage = getLanguageFromCookie(request);
  if (cookieLanguage) {
    return { language: cookieLanguage, detectionMethod: 'cookie' };
  }

  // 2. Check IP-based geolocation
  const country = getCountryFromHeaders(request);
  if (country) {
    const geoLanguage = getLanguageFromCountry(country);
    // Only use geo-based detection if it's not the default
    // This ensures Korean users get Korean, but doesn't force English on everyone else
    if (geoLanguage !== DEFAULT_LANGUAGE || country === 'US' || country === 'GB') {
      return { language: geoLanguage, detectionMethod: 'geo' };
    }
  }

  // 3. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const headerLanguage = parseAcceptLanguage(acceptLanguage);
  if (headerLanguage) {
    return { language: headerLanguage, detectionMethod: 'accept-language' };
  }

  // 4. Default language
  return { language: DEFAULT_LANGUAGE, detectionMethod: 'default' };
}

/**
 * Check if the current path has a language prefix
 * @param pathname - URL pathname
 * @returns Language code if found, null otherwise
 */
export function getLanguageFromPath(pathname: string): SupportedLanguage | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isSupportedLanguage(segments[0])) {
    return segments[0];
  }
  return null;
}

/**
 * Remove language prefix from pathname
 * @param pathname - URL pathname
 * @returns Pathname without language prefix
 */
export function removeLanguageFromPath(pathname: string): string {
  const language = getLanguageFromPath(pathname);
  if (language) {
    return pathname.replace(`/${language}`, '') || '/';
  }
  return pathname;
}