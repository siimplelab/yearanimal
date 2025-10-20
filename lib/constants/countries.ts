// Country code to language mapping for automatic language detection
// Using ISO 3166-1 alpha-2 country codes

export const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  // Korean-speaking regions
  'KR': 'ko', // South Korea
  'KP': 'ko', // North Korea

  // Chinese-speaking regions
  'CN': 'zh', // China
  'TW': 'zh', // Taiwan
  'HK': 'zh', // Hong Kong
  'MO': 'zh', // Macao
  'SG': 'zh', // Singapore (has significant Chinese-speaking population)

  // English as default for all other countries
  // Listed explicitly for major English-speaking countries
  'US': 'en', // United States
  'GB': 'en', // United Kingdom
  'CA': 'en', // Canada
  'AU': 'en', // Australia
  'NZ': 'en', // New Zealand
  'IE': 'en', // Ireland
  'ZA': 'en', // South Africa
  'IN': 'en', // India
  'PH': 'en', // Philippines
  'MY': 'en', // Malaysia

  // Default for all other countries will be English
};

// Supported languages in the application
export const SUPPORTED_LANGUAGES = ['en', 'ko', 'zh'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Default language when no detection is possible
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// Cookie configuration
export const LANGUAGE_COOKIE_NAME = 'yearanimal-lang';
export const LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Get language for a country code
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Supported language code
 */
export function getLanguageFromCountry(countryCode: string | null | undefined): SupportedLanguage {
  if (!countryCode) return DEFAULT_LANGUAGE;

  const upperCountryCode = countryCode.toUpperCase();
  const language = COUNTRY_LANGUAGE_MAP[upperCountryCode];

  // Return the mapped language or default to English
  return (language as SupportedLanguage) || DEFAULT_LANGUAGE;
}

/**
 * Check if a language is supported
 * @param lang - Language code to check
 * @returns Whether the language is supported
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}