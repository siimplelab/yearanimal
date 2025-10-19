import { generateMetadata as generateSEOMetadata, generateStructuredData, viewport as seoViewport } from '@/lib/config/seo';
import LayoutWrapper from '../components/LayoutWrapper';
import Script from 'next/script';
import "../globals.css";

export async function generateMetadata() {
  return generateSEOMetadata('en');
}

export const viewport = seoViewport;

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = 'en';
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
        <LayoutWrapper locale="en">
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}