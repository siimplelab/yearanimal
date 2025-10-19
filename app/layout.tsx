import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

// This tells Next.js which languages are supported
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }];
}