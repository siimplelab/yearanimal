'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useSearchParams } from 'next/navigation';
import { calculateZodiacProfile } from '@/lib/utils/zodiac-calculator';
import ShareButton from '../components/ShareButton';
import FlipCard from '../components/FlipCard';
import animationStyles from '../components/ResultAnimations.module.css';

export default function Home() {
  const { t, locale } = useI18n();
  const searchParams = useSearchParams();
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof calculateZodiacProfile> | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [showResultContent, setShowResultContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [currentStep, setCurrentStep] = useState<'input' | 'loading' | 'card' | 'details'>('input');
  const [showCardAnimation, setShowCardAnimation] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = 2100;

  // Update URL based on current step
  const updateURL = (step: string, yearValue?: string) => {
    const newUrl = new URL(window.location.href);
    if (step === 'input') {
      newUrl.searchParams.delete('year');
      newUrl.searchParams.delete('step');
    } else {
      if (yearValue) {
        newUrl.searchParams.set('year', yearValue);
      }
      if (step !== 'card') {
        newUrl.searchParams.set('step', step);
      }
    }
    window.history.pushState({ step, year: yearValue }, '', newUrl.toString());
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state) {
        if (state.step === 'input') {
          setResult(null);
          setShowForm(true);
          setShowResultContent(false);
          setCurrentStep('input');
        } else if (state.step === 'card') {
          setShowResultContent(false);
          setCurrentStep('card');
        } else if (state.step === 'details') {
          setShowResultContent(true);
          setCurrentStep('details');
        }
      } else {
        // Default to input if no state
        setResult(null);
        setShowForm(true);
        setShowResultContent(false);
        setCurrentStep('input');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check for year in URL on mount
  useEffect(() => {
    const urlYear = searchParams.get('year');
    const urlStep = searchParams.get('step');
    if (urlYear) {
      const yearNum = parseInt(urlYear, 10);
      if (!isNaN(yearNum) && yearNum >= minYear && yearNum <= maxYear) {
        setYear(urlYear);
        const profile = calculateZodiacProfile(yearNum);
        setResult(profile);
        setShowForm(false);

        if (urlStep === 'details') {
          setShowResultContent(true);
          setCurrentStep('details');
        } else {
          setShowResultContent(false);
          setCurrentStep('card');
        }

        // Set initial history state
        window.history.replaceState({ step: urlStep || 'card', year: urlYear }, '', window.location.href);
      }
    } else {
      // Set initial history state for input
      window.history.replaceState({ step: 'input' }, '', window.location.href);
    }
  }, [searchParams]);

  const handleBack = () => {
    if (showShare) {
      // Close share panel
      setShowShare(false);
    } else if (currentStep === 'details' || currentStep === 'card') {
      // From any result page, go back to input page
      setResult(null);
      setShowForm(true);
      setShowResultContent(false);
      setCurrentStep('input');
      setShowCardAnimation(false); // Reset card animation
      updateURL('input');
    }
  };

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

    // Start transition effect
    setIsTransitioning(true);
    setShowForm(false);
    setCurrentStep('loading');

    // Increased delay to 3 seconds
    setTimeout(() => {
      const profile = calculateZodiacProfile(yearNum);
      setResult(profile);
      setShowResultContent(false); // Reset the content visibility for new result
      setIsTransitioning(false);
      setCurrentStep('card');
      setShowCardAnimation(true); // Trigger card animation
      updateURL('card', year);
    }, 3000);
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
    // Just populate the field, don't submit automatically
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto">
      {/* Back Button - Show when not on input step or when share is open */}
      {(currentStep !== 'input' || showShare) && (
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('common.back') || 'Back'}
        </button>
      )}

      {/* Header - Add slide-up animation */}
      <div className={`text-center mb-12 ${animationStyles.landingSlideUp} ${animationStyles.landingDelay1}`}>
        <h1 className="text-3xl font-bold mb-3">
          {t('home.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t('home.subtitle')}
        </p>
      </div>

      {/* Loading state during transition */}
      {isTransitioning && (
        <div className="flex justify-center items-center h-64">
          <div className={`text-center ${animationStyles.loadingFadeIn}`}>
            <div className={`text-6xl mb-4 ${animationStyles.loadingPulse}`}>🔮</div>
            <p className="text-gray-600 dark:text-gray-400">
              {t('common.loading') || 'Discovering your zodiac...'}
            </p>
          </div>
        </div>
      )}

      {/* Input Form */}
      {!result && !isTransitioning && (
        <>
          <form onSubmit={handleSubmit} className={`space-y-6 ${showForm ? `${animationStyles.landingSlideUp} ${animationStyles.landingDelay2}` : animationStyles.fadeOut}`}>
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
                className="w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-900"
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
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('home.yearInput.submit')}
            </button>
          </form>

          {/* Quick Select */}
          <div className={`mt-8 ${showForm ? `${animationStyles.landingSlideUp} ${animationStyles.landingDelay3}` : animationStyles.fadeOut}`}>
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
          {/* Flip Card */}
          <div className={`flex justify-center ${showCardAnimation ? animationStyles.cardSlideUp : ''}`}>
            <FlipCard
              emoji={result.animal.emoji}
              animalName={result.animal.nameEn}
              onFlip={() => {
                setShowResultContent(true);
                setCurrentStep('details');
                updateURL('details', year);
              }}
              autoFlip={true}
            />
          </div>

          {/* Animal & Element Display - Show after flip */}
          {showResultContent && (
            <>
              <div className={`text-center space-y-4 ${animationStyles.slideUpContainer} ${animationStyles.delay1}`}>
                {/* Display all three languages together */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {result.fullName.en}
                  </h2>
                  <p className="text-xl font-semibold" lang="ko">
                    {result.fullName.ko} ({result.fullName.koYear})
                  </p>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300" lang="zh">
                    {result.fullName.hanja}
                  </p>
                </div>
              </div>

          {/* Element Badge */}
          <div className={`flex justify-center ${animationStyles.fadeInScale} ${animationStyles.delay2}`}>
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
              {locale === 'ko' ? result.element.nameKo : result.element.nameEn}
            </div>
          </div>

          {/* Traits */}
          <section className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-4 ${animationStyles.slideUpContainer} ${animationStyles.delay3}`} aria-labelledby="traits-heading">
            <h3 id="traits-heading" className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
              {t('result.traits')}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {result.animal.traits[locale as 'en' | 'ko' | 'zh'].map((trait, index) => (
                <li
                  key={index}
                  className={`px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm ${animationStyles.traitBadge}`}
                >
                  {trait}
                </li>
              ))}
            </ul>
          </section>

          {/* Lucky Numbers */}
          <section className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-4 ${animationStyles.slideUpContainer} ${animationStyles.delay4}`} aria-labelledby="lucky-numbers-heading">
            <h3 id="lucky-numbers-heading" className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300">
              {t('result.luckyNumbers')}
            </h3>
            <div className="flex gap-3" role="list">
              {result.animal.luckyNumbers.map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full font-semibold ${animationStyles.popIn}`}
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
              className={`w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${animationStyles.slideInLeft} ${animationStyles.delay1}`}
              aria-expanded={showShare}
              aria-controls="share-panel"
            >
              {showShare ? t('common.back') : t('common.share')}
            </button>

            {showShare && (
              <div id="share-panel" className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${animationStyles.fadeInScale}`}>
                <ShareButton profile={result} />
              </div>
            )}

            <button
              onClick={() => {
                setResult(null);
                setYear('');
                setShowShare(false);
                setShowResultContent(false); // Reset content visibility
                setShowForm(true); // Reset form visibility
                setCurrentStep('input'); // Reset to input step
                setShowCardAnimation(false); // Reset card animation
                updateURL('input');
              }}
              className={`w-full py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${animationStyles.slideInLeft} ${animationStyles.delay2}`}
            >
              {t('common.tryAgain')}
            </button>
          </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}