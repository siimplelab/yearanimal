'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-[85px] h-[32px] rounded-lg border border-gray-300 dark:border-gray-700" />
    );
  }

  return <LanguageSwitcherContent />;
}

function LanguageSwitcherContent() {
  const { locale } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Replace the locale in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">English</option>
      <option value="ko">한국어</option>
    </select>
  );
}