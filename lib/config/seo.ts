import type { Metadata } from "next";

export const siteConfig = {
  name: "Year Animal",
  url: "https://yearanimal.com",
  description: {
    en: "Discover your Chinese zodiac animal and element based on your birth year. Find out your personality traits, lucky numbers, and compatibility.",
    ko: "당신의 띠와 오행을 확인하고 성격, 행운의 숫자, 궁합을 알아보세요."
  },
  keywords: {
    en: ["Chinese zodiac", "year animal", "zodiac calculator", "12 animals", "5 elements", "birth year", "personality traits", "compatibility", "horoscope", "astrology"],
    ko: ["띠", "십이지", "오행", "갑자", "띠 계산기", "궁합", "운세", "동물띠", "생년월일", "성격"]
  },
  author: "Year Animal Team",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/yearanimal",
    twitter: "https://twitter.com/yearanimal"
  }
};

export function generateMetadata(locale: string = 'en'): Metadata {
  const isKorean = locale === 'ko';
  const title = isKorean
    ? "띠 찾기 - 당신의 띠와 오행을 확인하세요"
    : "Year Animal - Discover Your Chinese Zodiac";

  const description = isKorean
    ? siteConfig.description.ko
    : siteConfig.description.en;

  const keywords = isKorean
    ? siteConfig.keywords.ko.join(", ")
    : siteConfig.keywords.en.join(", ");

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`
    },
    description,
    keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ko': '/ko'
      }
    },
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: isKorean ? 'ko_KR' : 'en_US',
      alternateLocale: isKorean ? 'en_US' : 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
      creator: '@yearanimal',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Structured data for SEO (JSON-LD)
export function generateStructuredData(locale: string = 'en') {
  const isKorean = locale === 'ko';

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": isKorean ? siteConfig.description.ko : siteConfig.description.en,
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": siteConfig.author,
      "url": siteConfig.url
    },
    "inLanguage": [locale, isKorean ? "en" : "ko"],
    "availableLanguage": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      },
      {
        "@type": "Language",
        "name": "Korean",
        "alternateName": "ko"
      }
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?year={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}