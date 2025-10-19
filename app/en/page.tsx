import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import YearAnimalClient from './YearAnimalClient';

export default async function EnglishPage() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale="en">
      <YearAnimalClient />
    </NextIntlClientProvider>
  );
}