import { MetadataRoute } from 'next';
import { getSEOConfig } from '@/lib/utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSEOConfig('en');
  const baseUrl = config.default.siteUrl;
  const currentDate = new Date();

  // Generate URLs for main pages in all supported languages
  const routes = [
    '', // Home page
  ];

  const languages = ['en', 'ko', 'zh'];

  const sitemapEntries = languages.flatMap(lang =>
    routes.map(route => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.filter(l => l !== lang).map(l => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );

  // Add root URL
  sitemapEntries.unshift({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        languages.map(l => [l, `${baseUrl}/${l}`])
      ),
    },
  });

  // Add some example year pages (popular years)
  const popularYears = [2025, 2024, 2023, 2000, 1990, 1980];
  const yearPages = languages.flatMap(lang =>
    popularYears.map(year => ({
      url: `${baseUrl}/${lang}?year=${year}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }))
  );

  return [...sitemapEntries, ...yearPages];
}