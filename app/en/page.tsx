import { NextIntlClientProvider } from 'next-intl';
import YearAnimalClient from './YearAnimalClient';
import enMessages from '@/messages/en.json';

export default function EnglishPage() {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      <YearAnimalClient />
    </NextIntlClientProvider>
  );
}