import { generateMetadata as generateSEOMetadata } from '@/lib/utils/seo';
import LayoutWrapper from '../components/LayoutWrapper';
import SEOHead from '../components/SEOHead';
import type { Metadata, Viewport } from 'next';
import "../globals.css";

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata('zh', 'home');
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function ChineseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <SEOHead locale="zh" />
        <LayoutWrapper locale="zh">
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}