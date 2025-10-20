'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateZodiacProfile } from '@/lib/utils/zodiac-calculator';
import ShareButton from '../components/ShareButton';

export default function Home() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateZodiacProfile> | null>(null);
  const [showShare, setShowShare] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = 2100;

  // Check for year in URL on mount
  useEffect(() => {
    const urlYear = searchParams.get('year');
    if (urlYear) {
      const yearNum = parseInt(urlYear, 10);
      if (!isNaN(yearNum) && yearNum >= minYear && yearNum <= maxYear) {
        setYear(urlYear);
        const profile = calculateZodiacProfile(yearNum);
        setResult(profile);
      }
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const yearNum = parseInt(year, 10);

    if (!year) {
      setError(t('home.yearInput.validation.required'));
      return;
    }

    if (isNaN(yearNum)) {
      setError(t('home.yearInput.validation.invalid'));
      return;
    }

    if (yearNum < minYear || yearNum > maxYear) {
      setError(t('home.yearInput.validation.range', { min: minYear, max: maxYear }));
      return;
    }

    const profile = calculateZodiacProfile(yearNum);
    setResult(profile);
  };

  const quickSelectYears = [
    currentYear,
    currentYear - 1,
    1990,
    2000,
    1980,
    1970
  ];

  const handleQuickSelect = (selectedYear: number) => {
    setYear(selectedYear.toString());
    setError('');
    const profile = calculateZodiacProfile(selectedYear);
    setResult(profile);
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          {t('home.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Input Form */}
      {!result && (
        <>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium mb-2">
                {t('home.yearInput.label')}
              </label>
              <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={t('home.yearInput.placeholder')}
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
                min={minYear}
                max={maxYear}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('home.yearInput.submit')}
            </button>
          </form>

          {/* Quick Select */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t('home.quickSelect.title')}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {quickSelectYears.map((qYear) => (
                <button
                  key={qYear}
                  onClick={() => handleQuickSelect(qYear)}
                  className="py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {qYear}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Result Display */}
      {result && (
        <div className="space-y-6">
          {/* Animal & Element Display */}
          <div className="text-center space-y-4">
            <div className="text-6xl" role="img" aria-label={`${result.animal.nameEn} emoji`}>
              {result.animal.emoji}
            </div>
            {/* Display all three languages together */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold" lang="zh">
                {result.fullName.hanja}
              </h2>
              <p className="text-xl font-semibold">
                {result.fullName.en}
              </p>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300" lang="ko">
                {result.fullName.koYear}
              </p>
            </div>
          </div>

          {/* Element Badge */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center px-4 py-2 rounded-full font-medium"
              style={{
                backgroundColor: `${result.element.colors.hex[0]}20`,
                color: result.element.colors.hex[0]
              }}
              role="status"
              aria-label={`Element: ${result.element.nameEn}`}
            >
              <span className="mr-2" aria-hidden="true">{result.element.symbol}</span>
              {result.element.nameKo}
            </div>
          </div>

          {/* Traits */}
          <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4" aria-labelledby="traits-heading">
            <h3 id="traits-heading" className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
              {t('result.traits')}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {result.animal.traits.en.map((trait, index) => (
                <li
                  key={index}
                  className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </section>

          {/* Lucky Numbers */}
          <section className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4" aria-labelledby="lucky-numbers-heading">
            <h3 id="lucky-numbers-heading" className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
              {t('result.luckyNumbers')}
            </h3>
            <div className="flex gap-3" role="list">
              {result.animal.luckyNumbers.map((num) => (
                <div
                  key={num}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full font-semibold"
                  role="listitem"
                  aria-label={`Lucky number ${num}`}
                >
                  {num}
                </div>
              ))}
            </div>
          </section>

          {/* Share and Reset Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowShare(!showShare)}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-expanded={showShare}
              aria-controls="share-panel"
            >
              {showShare ? t('common.back') : t('common.share')}
            </button>

            {showShare && (
              <div id="share-panel" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <ShareButton profile={result} />
              </div>
            )}

            <button
              onClick={() => {
                setResult(null);
                setYear('');
                setShowShare(false);
                // Remove year from URL
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.delete('year');
                router.replace(newUrl.pathname);
              }}
              className="w-full py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              {t('common.tryAgain')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}