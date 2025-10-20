import { MetadataRoute } from 'next';
import { getSEOConfig } from '@/lib/utils/seo';

export default function robots(): MetadataRoute.Robots {
  const config = getSEOConfig('en');
  const siteUrl = config.default.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}