import { I18nProvider } from '@/lib/i18n/i18n-context';

export default function ChineseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider defaultLocale="zh">
      {children}
    </I18nProvider>
  );
}