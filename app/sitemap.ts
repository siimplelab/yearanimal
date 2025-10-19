import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Generate URLs for main pages in both languages
  const routes = [
    '',
    '/gallery',
    '/compatibility',
    '/about',
  ];

  const languages = ['en', 'ko'];

  const sitemapEntries = languages.flatMap(lang =>
    routes.map(route => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Add some example year pages (popular years)
  const popularYears = [2024, 2023, 2000, 1990, 1980, 1970];
  const yearPages = languages.flatMap(lang =>
    popularYears.map(year => ({
      url: `${baseUrl}/${lang}?year=${year}`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }))
  );

  return [...sitemapEntries, ...yearPages];
}