import { generateMetadata as generateSEOMetadata } from '@/lib/utils/seo';
import LayoutWrapper from '../components/LayoutWrapper';
import SEOHead from '../components/SEOHead';
import type { Metadata, Viewport } from 'next';
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('ko', 'home');
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function LocaleLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <SEOHead locale="ko" />
        <LayoutWrapper locale="ko">
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}