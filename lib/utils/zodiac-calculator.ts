import { ZodiacProfile } from '../types/zodiac';
import { animals } from '../data/animals';
import { elements } from '../data/elements';

/**
 * Calculate the complete zodiac profile for a given year
 * The Chinese zodiac operates on a 60-year cycle combining:
 * - 12 animals (12-year cycle)
 * - 10 heavenly stems (5 elements × 2 polarities)
 */
export function calculateZodiacProfile(year: number): ZodiacProfile {
  // Reference year is 1924 (Wood Rat - start of a 60-year cycle)
  const referenceYear = 1924;

  // Calculate position in 60-year cycle
  const cyclePosition = ((year - referenceYear) % 60 + 60) % 60;
  const cycleYear = cyclePosition + 1; // 1-based position

  // Calculate animal (12-year cycle)
  // Starting from Rat (1924, 1936, 1948...)
  const animalIndex = cyclePosition % 12;
  const animal = animals[animalIndex];

  // Calculate heavenly stem (10-year cycle)
  const stemIndex = cyclePosition % 10;
  const elementIndex = Math.floor(stemIndex / 2);
  const element = elements[elementIndex];
  const isYinYear = stemIndex % 2 === 1;

  // Get the appropriate heavenly stem
  const heavenlyStem = isYinYear ? element.heavenlyStems.yin : element.heavenlyStems.yang;

  // Construct full names
  const fullName = {
    ko: `${element.colors.ko[0]}${animal.nameKo}띠`,
    en: `${element.nameEn} ${animal.nameEn}`,
    traditional: `${heavenlyStem.hanja}${animal.earthlyBranchHanja}년`,
    hanja: `${heavenlyStem.hanja}${animal.earthlyBranchHanja}年`,
    koYear: `${heavenlyStem.ko}${animal.earthlyBranch}년` // Pure Hangul year notation (e.g., 경오년, 을사년)
  };

  return {
    year,
    animal,
    element,
    isYinYear,
    heavenlyStem,
    fullName,
    cycleYear
  };
}

/**
 * Get years for a specific animal within a range
 */
export function getYearsForAnimal(animalId: string, startYear: number = 1900, endYear: number = 2100): number[] {
  const years: number[] = [];
  const animal = animals.find(a => a.id === animalId);
  if (!animal) return years;

  for (let year = startYear; year <= endYear; year++) {
    const profile = calculateZodiacProfile(year);
    if (profile.animal.id === animalId) {
      years.push(year);
    }
  }

  return years;
}

/**
 * Get years for a specific element within a range
 */
export function getYearsForElement(elementId: string, startYear: number = 1900, endYear: number = 2100): number[] {
  const years: number[] = [];
  const element = elements.find(e => e.id === elementId);
  if (!element) return years;

  for (let year = startYear; year <= endYear; year++) {
    const profile = calculateZodiacProfile(year);
    if (profile.element.id === elementId) {
      years.push(year);
    }
  }

  return years;
}

/**
 * Get years for a specific animal-element combination
 */
export function getYearsForCombination(animalId: string, elementId: string, startYear: number = 1900, endYear: number = 2100): number[] {
  const years: number[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const profile = calculateZodiacProfile(year);
    if (profile.animal.id === animalId && profile.element.id === elementId) {
      years.push(year);
    }
  }

  return years;
}

/**
 * Check zodiac compatibility between two years
 */
export function checkCompatibility(year1: number, year2: number): {
  animalCompatibility: 'excellent' | 'good' | 'neutral' | 'challenging';
  elementCompatibility: 'harmonious' | 'neutral' | 'conflicting';
  overall: number; // 0-100 score
} {
  const profile1 = calculateZodiacProfile(year1);
  const profile2 = calculateZodiacProfile(year2);

  // Check animal compatibility
  let animalCompatibility: 'excellent' | 'good' | 'neutral' | 'challenging' = 'neutral';

  if (profile1.animal.compatible.includes(profile2.animal.id)) {
    animalCompatibility = 'excellent';
  } else if (profile1.animal.incompatible.includes(profile2.animal.id)) {
    animalCompatibility = 'challenging';
  } else if (profile1.animal.id === profile2.animal.id) {
    animalCompatibility = 'good';
  }

  // Check element compatibility (simplified version of Wu Xing cycle)
  let elementCompatibility: 'harmonious' | 'neutral' | 'conflicting' = 'neutral';
  const elementCycle = {
    wood: { generates: 'fire', destroys: 'earth' },
    fire: { generates: 'earth', destroys: 'metal' },
    earth: { generates: 'metal', destroys: 'water' },
    metal: { generates: 'water', destroys: 'wood' },
    water: { generates: 'wood', destroys: 'fire' }
  };

  const elem1 = profile1.element.id as keyof typeof elementCycle;
  const elem2 = profile2.element.id;

  if (elementCycle[elem1].generates === elem2 || elementCycle[elem2 as keyof typeof elementCycle].generates === elem1) {
    elementCompatibility = 'harmonious';
  } else if (elementCycle[elem1].destroys === elem2 || elementCycle[elem2 as keyof typeof elementCycle].destroys === elem1) {
    elementCompatibility = 'conflicting';
  }

  // Calculate overall score
  let overall = 50; // Base score

  // Animal compatibility adjustment
  if (animalCompatibility === 'excellent') overall += 30;
  else if (animalCompatibility === 'good') overall += 15;
  else if (animalCompatibility === 'challenging') overall -= 25;

  // Element compatibility adjustment
  if (elementCompatibility === 'harmonious') overall += 20;
  else if (elementCompatibility === 'conflicting') overall -= 15;

  // Ensure score is within 0-100
  overall = Math.max(0, Math.min(100, overall));

  return {
    animalCompatibility,
    elementCompatibility,
    overall
  };
}

/**
 * Get the next occurrence of a specific zodiac combination
 */
export function getNextOccurrence(animalId: string, elementId: string, fromYear: number = new Date().getFullYear()): number | null {
  // The same animal-element combination repeats every 60 years
  for (let year = fromYear + 1; year <= fromYear + 60; year++) {
    const profile = calculateZodiacProfile(year);
    if (profile.animal.id === animalId && profile.element.id === elementId) {
      return year;
    }
  }

  return null;
}