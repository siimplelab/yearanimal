export interface Animal {
  id: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  earthlyBranch: string; // 지지
  earthlyBranchHanja: string; // 地支
  order: number;
  traits: {
    ko: string[];
    en: string[];
  };
  luckyNumbers: number[];
  compatible: string[]; // Animal IDs
  incompatible: string[]; // Animal IDs
}

export interface Element {
  id: string;
  nameKo: string;
  nameEn: string;
  hanja: string; // 한자
  colors: {
    ko: string[];
    en: string[];
    hex: string[];
  };
  heavenlyStems: {
    yang: { ko: string; hanja: string };
    yin: { ko: string; hanja: string };
  };
  traits: {
    ko: string[];
    en: string[];
  };
  symbol: string; // emoji or icon
}

export interface ZodiacProfile {
  year: number;
  animal: Animal;
  element: Element;
  isYinYear: boolean;
  heavenlyStem: {
    ko: string;
    hanja: string;
  };
  fullName: {
    ko: string; // e.g., "백마띠"
    en: string; // e.g., "Metal Horse"
    traditional: string; // e.g., "庚午년"
    hanja: string; // e.g., "庚午年"
    koYear: string; // e.g., "경오년" (pure Hangul)
  };
  cycleYear: number; // 1-60 position in the cycle
}

export interface Language {
  code: 'ko' | 'en';
  name: string;
}

export type YearRange = {
  min: number;
  max: number;
};