export interface SEOConfig {
  default: DefaultSEO;
  pages: Pages;
  structured_data: StructuredData;
  social: Social;
  alternates: Alternates;
}

export interface DefaultSEO {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  author: string;
  siteName: string;
  siteUrl: string;
  locale: string;
  type: string;
  twitterCard: string;
  twitterSite: string;
  themeColor: string;
}

export interface Pages {
  home: PageSEO;
  result: PageSEO;
  [key: string]: PageSEO;
}

export interface PageSEO {
  title: string;
  description: string;
  ogImage: string;
  canonical?: string;
}

export interface StructuredData {
  organization: OrganizationSchema;
  breadcrumbs: BreadcrumbSchema;
  faq: FAQSchema;
  [key: string]: OrganizationSchema | BreadcrumbSchema | FAQSchema;
}

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  featureList?: string[];
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface Social {
  facebook: {
    appId: string;
    pages: string;
  };
  twitter: {
    handle: string;
    site: string;
    creator: string;
  };
  instagram: string;
  youtube: string;
  naver?: string;
  kakao?: string;
  weibo?: string;
  wechat?: string;
}

export interface Alternates {
  languages: {
    [key: string]: string;
  };
}

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  og?: OpenGraph;
  twitter?: TwitterCard;
  alternates?: AlternateLinks[];
  robots?: string;
  viewport?: string;
  themeColor?: string;
  applicationName?: string;
  generator?: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  type: string;
  url: string;
  siteName: string;
  locale: string;
  image: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface TwitterCard {
  card: string;
  site: string;
  creator?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

export interface AlternateLinks {
  hreflang: string;
  href: string;
}