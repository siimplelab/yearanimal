import { Suspense } from 'react';
import YearAnimalClient from './YearAnimalClient';

export default function KoreanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <YearAnimalClient />
    </Suspense>
  );
}