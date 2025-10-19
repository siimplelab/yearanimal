'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import enMessages from '@/messages/en.json';
import koMessages from '@/messages/ko.json';

type Messages = typeof enMessages;
type Locale = 'en' | 'ko';

interface I18nContextType {
  locale: Locale;
  messages: Messages;
  changeLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const messages = {
  en: enMessages,
  ko: koMessages,
};

export function I18nProvider({
  children,
  defaultLocale = 'en'
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
  }, []);

  const t = useCallback((key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    if (!value) return key;

    // Handle interpolation
    if (variables && typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (match, varName) => {
        return variables[varName] !== undefined ? String(variables[varName]) : match;
      });
    }

    return String(value);
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{
        locale,
        messages: messages[locale],
        changeLocale,
        t
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}