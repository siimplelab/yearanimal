import { NextIntlClientProvider } from 'next-intl';
import YearAnimalClient from './YearAnimalClient';
import koMessages from '@/messages/ko.json';

export default function KoreanPage() {
  return (
    <NextIntlClientProvider messages={koMessages} locale="ko">
      <YearAnimalClient />
    </NextIntlClientProvider>
  );
}