'use client';

import { useState } from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { ZodiacProfile } from '@/lib/types/zodiac';

interface ShareButtonProps {
  profile: ZodiacProfile;
}

export default function ShareButton({ profile }: ShareButtonProps) {
  const { t, locale } = useI18n();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${locale}?year=${profile.year}`
    : '';

  const fullName = locale === 'ko' ? profile.fullName.ko :
                   locale === 'zh' ? profile.fullName.hanja :
                   profile.fullName.en;

  const shareText = t('result.shareText', { fullName });
  const shareTitle = t('result.shareTitle', { fullName });

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = '';

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'telegram':
        shareLink = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'kakao':
        // Note: Kakao requires SDK initialization, this is a simplified version
        shareLink = `https://story.kakao.com/share?url=${encodedUrl}`;
        break;
      case 'line':
        shareLink = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
        break;
      case 'native':
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            });
          } catch {
            console.log('Share cancelled');
          }
          return;
        }
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          console.error('Failed to copy');
        }
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">
        {t('common.share')}
      </h3>

      {/* Native Share (if supported) */}
      {typeof window !== 'undefined' && 'share' in navigator && (
        <button
          onClick={() => handleShare('native')}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          aria-label="Share using device share menu"
        >
          {t('common.share')} {profile.fullName.en}
        </button>
      )}

      {/* Social Media Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleShare('twitter')}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        <button
          onClick={() => handleShare('facebook')}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={() => handleShare('whatsapp')}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>

        {locale === 'ko' && (
          <>
            <button
              onClick={() => handleShare('kakao')}
              className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share on Kakao"
            >
              <span className="text-sm font-medium">{t('share.platforms.kakao')}</span>
            </button>

            <button
              onClick={() => handleShare('line')}
              className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Share on Line"
            >
              <span className="text-sm font-medium">{t('share.platforms.line')}</span>
            </button>
          </>
        )}

        <button
          onClick={() => handleShare('telegram')}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Share on Telegram"
        >
          <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.492 6.036-1.811 7.348-.127.523-.376.689-.617.708-.522.04-1.091-.342-1.698-.671-.945-.512-2.97-1.935-3.515-2.401-.155-.133-.364-.444.026-.803.873-.806 1.914-1.806 2.544-2.44.29-.291.58-1.069-.634-.155-1.733 1.308-3.451 2.533-3.821 2.787-.327.224-.626.331-.923.242-.581-.089-1.772-.349-2.072-.447-.377-.123-.676-.376-.03-.78 3.373-2.107 6.734-4.215 10.055-6.391.241-.157.562-.037.496.003z" />
          </svg>
        </button>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={() => handleShare('copy')}
        className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-label="Copy link to clipboard"
      >
        {copied ? `✓ ${t('common.copied')}` : t('common.copyLink')}
      </button>

      {/* Direct Link Display */}
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('common.directLink')}:</p>
        <p className="text-xs break-all font-mono">{shareUrl}</p>
      </div>
    </div>
  );
}