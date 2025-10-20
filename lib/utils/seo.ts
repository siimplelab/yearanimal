import type { Metadata } from 'next';
import type { SEOConfig, MetaTags, PageSEO } from '@/lib/types/seo';

// Import SEO configurations
import enSEO from '@/config/seo/en.json';
import koSEO from '@/config/seo/ko.json';
import zhSEO from '@/config/seo/zh.json';

const seoConfigs: Record<string, SEOConfig> = {
  en: enSEO as SEOConfig,
  ko: koSEO as SEOConfig,
  zh: zhSEO as SEOConfig,
};

/**
 * Get SEO configuration for a specific locale
 */
export function getSEOConfig(locale: string = 'en'): SEOConfig {
  return seoConfigs[locale] || seoConfigs.en;
}

/**
 * Generate meta tags for a specific page
 */
export function generateMetaTags(
  locale: string = 'en',
  page: string = 'home',
  variables?: Record<string, string>
): MetaTags {
  const config = getSEOConfig(locale);
  const pageConfig = config.pages[page] || config.pages.home;

  // Replace variables in title and description
  let title = pageConfig.title;
  let description = pageConfig.description;

  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      title = title.replace(`{${key}}`, value);
      description = description.replace(`{${key}}`, value);
    });
  }

  // Generate alternate links
  const alternates = Object.entries(config.alternates.languages).map(([lang, path]) => ({
    hreflang: lang,
    href: `${config.default.siteUrl}${path}${page !== 'home' ? `/${page}` : ''}`,
  }));

  return {
    title,
    description,
    keywords: config.default.keywords.join(', '),
    author: config.default.author,
    canonical: `${config.default.siteUrl}${pageConfig.canonical || ''}`,
    og: {
      title,
      description,
      type: config.default.type,
      url: `${config.default.siteUrl}${pageConfig.canonical || ''}`,
      siteName: config.default.siteName,
      locale: config.default.locale,
      image: `${config.default.siteUrl}${pageConfig.ogImage}`,
    },
    twitter: {
      card: config.default.twitterCard,
      site: config.social.twitter.site,
      creator: config.social.twitter.creator,
      title,
      description,
      image: `${config.default.siteUrl}${pageConfig.ogImage}`,
    },
    alternates,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    themeColor: config.default.themeColor,
    applicationName: config.default.siteName,
    generator: 'Next.js',
  };
}

/**
 * Generate Next.js Metadata object
 */
export function generateMetadata(
  locale: string = 'en',
  page: string = 'home',
  variables?: Record<string, string>
): Metadata {
  const metaTags = generateMetaTags(locale, page, variables);
  const config = getSEOConfig(locale);

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    authors: [{ name: metaTags.author }],
    creator: metaTags.author,
    publisher: metaTags.author,
    applicationName: metaTags.applicationName,
    generator: metaTags.generator,
    referrer: 'origin-when-cross-origin',
    themeColor: metaTags.themeColor,
    viewport: metaTags.viewport,

    openGraph: {
      title: metaTags.og?.title || metaTags.title,
      description: metaTags.og?.description || metaTags.description,
      url: metaTags.og?.url,
      siteName: metaTags.og?.siteName,
      locale: metaTags.og?.locale,
      type: 'website',
      images: metaTags.og?.image ? [
        {
          url: metaTags.og.image,
          width: 1200,
          height: 630,
          alt: metaTags.og?.imageAlt || metaTags.title,
        }
      ] : undefined,
    },

    twitter: {
      card: 'summary_large_image',
      site: metaTags.twitter?.site,
      creator: metaTags.twitter?.creator,
      title: metaTags.twitter?.title || metaTags.title,
      description: metaTags.twitter?.description || metaTags.description,
      images: metaTags.twitter?.image ? [metaTags.twitter.image] : undefined,
    },

    alternates: {
      canonical: metaTags.canonical,
      languages: config.alternates.languages,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    },

    manifest: '/manifest.json',
  };
}

/**
 * Generate structured data for SEO
 */
export function generateStructuredData(
  locale: string = 'en',
  type: 'organization' | 'breadcrumbs' | 'faq' = 'organization'
): string {
  const config = getSEOConfig(locale);
  const data = config.structured_data[type];

  if (!data) return '';

  return JSON.stringify(data, null, 2);
}

/**
 * Generate complete SEO header tags
 */
export function generateSEOTags(
  locale: string = 'en',
  page: string = 'home',
  variables?: Record<string, string>
): {
  metaTags: MetaTags;
  structuredData: {
    organization: string;
    breadcrumbs: string;
    faq: string;
  };
} {
  const metaTags = generateMetaTags(locale, page, variables);

  return {
    metaTags,
    structuredData: {
      organization: generateStructuredData(locale, 'organization'),
      breadcrumbs: generateStructuredData(locale, 'breadcrumbs'),
      faq: generateStructuredData(locale, 'faq'),
    },
  };
}

/**
 * Get page-specific SEO configuration
 */
export function getPageSEO(
  locale: string = 'en',
  page: string = 'home'
): PageSEO {
  const config = getSEOConfig(locale);
  return config.pages[page] || config.pages.home;
}

/**
 * Generate dynamic title with template
 */
export function generateTitle(
  title: string,
  locale: string = 'en'
): string {
  const config = getSEOConfig(locale);
  const template = config.default.titleTemplate;
  return template.replace('%s', title);
}

/**
 * Get social media links
 */
export function getSocialLinks(locale: string = 'en') {
  const config = getSEOConfig(locale);
  return config.social;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(siteUrl: string = 'https://yearanimal.com'): string {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas (if any)
# Disallow: /admin/
# Disallow: /api/admin/
`;
}

/**
 * Generate sitemap.xml content
 */
export function generateSitemap(siteUrl: string = 'https://yearanimal.com'): string {
  const languages = ['en', 'ko', 'zh'];
  const pages = [''];

  const urls = languages.flatMap(lang =>
    pages.map(page => `${siteUrl}/${lang}${page}`)
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.endsWith('/en') || url.endsWith('/ko') || url.endsWith('/zh') ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}