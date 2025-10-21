'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';
import { LANGUAGE_COOKIE_NAME, LANGUAGE_COOKIE_MAX_AGE } from '@/lib/constants/countries';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'zh', label: '中文' }
];

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-[41px] h-[40px] rounded-lg border border-gray-300 dark:border-gray-700" />
    );
  }

  return <LanguageSwitcherContent />;
}

function LanguageSwitcherContent() {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (newLocale: string) => {
    // Set cookie to remember language preference
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + LANGUAGE_COOKIE_MAX_AGE);

    document.cookie = `${LANGUAGE_COOKIE_NAME}=${newLocale}; path=/; max-age=${LANGUAGE_COOKIE_MAX_AGE}; SameSite=Lax${
      window.location.protocol === 'https:' ? '; Secure' : ''
    }`;

    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
        title={`Current language: ${currentLanguage.label}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleChange(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  lang.code === locale ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'
                }`}
                role="menuitem"
              >
                <span>{lang.label}</span>
                {lang.code === locale && (
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}