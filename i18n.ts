import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'ko'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({locale}) => {
  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});