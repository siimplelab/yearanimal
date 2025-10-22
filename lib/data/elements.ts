import { Element } from '../types/zodiac';

export const elements: Element[] = [
  {
    id: 'wood',
    nameKo: '목',
    nameEn: 'Wood',
    hanja: '木',
    colors: {
      ko: ['청', '녹'],
      en: ['Blue', 'Green'],
      hex: ['#1E90FF', '#228B22', '#00CED1']
    },
    heavenlyStems: {
      yang: { ko: '갑', hanja: '甲' },
      yin: { ko: '을', hanja: '乙' }
    },
    traits: {
      ko: ['성장', '유연성', '창의성', '관대함', '이상주의'],
      en: ['Growth', 'Flexibility', 'Creativity', 'Generosity', 'Idealism'],
      zh: ['成长', '灵活', '创造力', '慷慨', '理想主义']
    },
    symbol: '🌲'
  },
  {
    id: 'fire',
    nameKo: '화',
    nameEn: 'Fire',
    hanja: '火',
    colors: {
      ko: ['적', '홍'],
      en: ['Red', 'Crimson'],
      hex: ['#DC143C', '#FF6347', '#FF4500']
    },
    heavenlyStems: {
      yang: { ko: '병', hanja: '丙' },
      yin: { ko: '정', hanja: '丁' }
    },
    traits: {
      ko: ['열정', '활력', '리더십', '모험심', '자신감'],
      en: ['Passion', 'Energy', 'Leadership', 'Adventure', 'Confidence'],
      zh: ['热情', '活力', '领导力', '冒险精神', '自信']
    },
    symbol: '🔥'
  },
  {
    id: 'earth',
    nameKo: '토',
    nameEn: 'Earth',
    hanja: '土',
    colors: {
      ko: ['황', '갈'],
      en: ['Yellow', 'Brown'],
      hex: ['#FFD700', '#D2691E', '#F4A460']
    },
    heavenlyStems: {
      yang: { ko: '무', hanja: '戊' },
      yin: { ko: '기', hanja: '己' }
    },
    traits: {
      ko: ['안정성', '실용성', '신뢰성', '인내심', '양육'],
      en: ['Stability', 'Practicality', 'Reliability', 'Patience', 'Nurturing'],
      zh: ['稳定', '实用', '可靠', '耐心', '养育']
    },
    symbol: '🏔️'
  },
  {
    id: 'metal',
    nameKo: '금',
    nameEn: 'Metal',
    hanja: '金',
    colors: {
      ko: ['백', '은'],
      en: ['White', 'Silver'],
      hex: ['#C0C0C0', '#FFD700', '#E5E4E2']
    },
    heavenlyStems: {
      yang: { ko: '경', hanja: '庚' },
      yin: { ko: '신', hanja: '辛' }
    },
    traits: {
      ko: ['결단력', '정의감', '조직력', '독립성', '완벽주의'],
      en: ['Determination', 'Justice', 'Organization', 'Independence', 'Perfectionism'],
      zh: ['决心', '正义', '组织能力', '独立', '完美主义']
    },
    symbol: '⚔️'
  },
  {
    id: 'water',
    nameKo: '수',
    nameEn: 'Water',
    hanja: '水',
    colors: {
      ko: ['흑', '남'],
      en: ['Black', 'Dark Blue'],
      hex: ['#000080', '#191970', '#2F4F4F']
    },
    heavenlyStems: {
      yang: { ko: '임', hanja: '壬' },
      yin: { ko: '계', hanja: '癸' }
    },
    traits: {
      ko: ['지혜', '유연성', '직관력', '동정심', '소통'],
      en: ['Wisdom', 'Flexibility', 'Intuition', 'Empathy', 'Communication'],
      zh: ['智慧', '灵活', '直觉', '同理心', '沟通']
    },
    symbol: '💧'
  }
];

// Helper function to get element by ID
export function getElementById(id: string): Element | undefined {
  return elements.find(element => element.id === id);
}

// Helper function to get element by index (0-4)
export function getElementByIndex(index: number): Element | undefined {
  return elements[index];
}