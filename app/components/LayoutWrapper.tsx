'use client';

import { ThemeProvider } from './ThemeProvider';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';

interface LayoutWrapperProps {
  children: React.ReactNode;
  locale: 'en' | 'ko';
}

export default function LayoutWrapper({ children, locale }: LayoutWrapperProps) {
  return (
    <ThemeProvider>
      <I18nProvider defaultLocale={locale}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50">
          Skip to main content
        </a>
        <header className="fixed top-0 right-0 z-10 flex items-center gap-2 p-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </header>
        <main id="main-content" role="main">
          {children}
        </main>
      </I18nProvider>
    </ThemeProvider>
  );
}