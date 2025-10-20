import YearAnimalClient from './YearAnimalClient';
import { Suspense } from 'react';

export default function ChinesePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YearAnimalClient />
    </Suspense>
  );
}