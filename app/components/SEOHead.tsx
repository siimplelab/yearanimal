import Script from 'next/script';
import { generateStructuredData } from '@/lib/utils/seo';

interface SEOHeadProps {
  locale: string;
  structuredDataTypes?: ('organization' | 'breadcrumbs' | 'faq')[];
}

export default function SEOHead({
  locale = 'en',
  structuredDataTypes = ['organization', 'breadcrumbs', 'faq']
}: SEOHeadProps) {
  return (
    <>
      {structuredDataTypes.map(type => {
        const data = generateStructuredData(locale, type);
        if (!data) return null;

        return (
          <Script
            key={type}
            id={`structured-data-${type}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data }}
            strategy="afterInteractive"
          />
        );
      })}
    </>
  );
}