import { generateMetadata as generateSEOMetadata, generateStructuredData, viewport as seoViewport } from '@/lib/config/seo';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '../components/ThemeProvider';
import ThemeSwitcher from '../components/ThemeSwitcher';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Script from 'next/script';
import "../globals.css";

export async function generateMetadata() {
  return generateSEOMetadata('ko');
}

export const viewport = seoViewport;

export default async function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = 'ko';
  const messages = await getMessages();
  const structuredData = generateStructuredData(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
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
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}