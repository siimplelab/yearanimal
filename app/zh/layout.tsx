import { generateMetadata as generateSEOMetadata } from '@/lib/utils/seo';
import { I18nProvider } from '@/lib/i18n/i18n-context';
import SEOHead from '../components/SEOHead';
import type { Metadata, Viewport } from 'next';

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
    <I18nProvider defaultLocale="zh">
      <SEOHead locale="zh" />
      {children}
    </I18nProvider>
  );
}