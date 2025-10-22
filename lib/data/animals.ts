import { Animal } from '../types/zodiac';

export const animals: Animal[] = [
  {
    id: 'rat',
    nameKo: '쥐',
    nameEn: 'Rat',
    emoji: '🐀',
    earthlyBranch: '자',
    earthlyBranchHanja: '子',
    order: 1,
    traits: {
      ko: ['영리함', '근면함', '매력적', '수완이 좋음', '적응력이 뛰어남'],
      en: ['Intelligent', 'Hardworking', 'Charming', 'Resourceful', 'Adaptable'],
      zh: ['聪明', '勤劳', '有魅力', '足智多谋', '适应力强']
    },
    luckyNumbers: [2, 3],
    compatible: ['dragon', 'monkey', 'ox'],
    incompatible: ['horse', 'rooster']
  },
  {
    id: 'ox',
    nameKo: '소',
    nameEn: 'Ox',
    emoji: '🐂',
    earthlyBranch: '축',
    earthlyBranchHanja: '丑',
    order: 2,
    traits: {
      ko: ['성실함', '신뢰성', '인내심', '정직함', '책임감'],
      en: ['Diligent', 'Reliable', 'Patient', 'Honest', 'Responsible'],
      zh: ['勤奋', '可靠', '有耐心', '诚实', '负责任']
    },
    luckyNumbers: [1, 4],
    compatible: ['rat', 'snake', 'rooster'],
    incompatible: ['tiger', 'dragon', 'horse', 'goat']
  },
  {
    id: 'tiger',
    nameKo: '호랑이',
    nameEn: 'Tiger',
    emoji: '🐅',
    earthlyBranch: '인',
    earthlyBranchHanja: '寅',
    order: 3,
    traits: {
      ko: ['용감함', '자신감', '경쟁심', '예측불가능', '관대함'],
      en: ['Brave', 'Confident', 'Competitive', 'Unpredictable', 'Generous'],
      zh: ['勇敢', '自信', '竞争力强', '不可预测', '慷慨']
    },
    luckyNumbers: [1, 3, 4],
    compatible: ['dragon', 'horse', 'pig'],
    incompatible: ['ox', 'tiger', 'snake', 'monkey']
  },
  {
    id: 'rabbit',
    nameKo: '토끼',
    nameEn: 'Rabbit',
    emoji: '🐰',
    earthlyBranch: '묘',
    earthlyBranchHanja: '卯',
    order: 4,
    traits: {
      ko: ['우아함', '친절함', '책임감', '조용함', '인내심'],
      en: ['Elegant', 'Kind', 'Responsible', 'Quiet', 'Patient'],
      zh: ['优雅', '善良', '负责任', '安静', '有耐心']
    },
    luckyNumbers: [3, 4, 6],
    compatible: ['goat', 'monkey', 'dog', 'pig'],
    incompatible: ['rooster', 'dragon']
  },
  {
    id: 'dragon',
    nameKo: '용',
    nameEn: 'Dragon',
    emoji: '🐲',
    earthlyBranch: '진',
    earthlyBranchHanja: '辰',
    order: 5,
    traits: {
      ko: ['강력함', '카리스마', '행운', '지적임', '열정적'],
      en: ['Powerful', 'Charismatic', 'Lucky', 'Intelligent', 'Passionate'],
      zh: ['强大', '有魅力', '幸运', '聪明', '热情']
    },
    luckyNumbers: [1, 6, 7],
    compatible: ['rat', 'tiger', 'snake'],
    incompatible: ['ox', 'dog', 'rabbit']
  },
  {
    id: 'snake',
    nameKo: '뱀',
    nameEn: 'Snake',
    emoji: '🐍',
    earthlyBranch: '사',
    earthlyBranchHanja: '巳',
    order: 6,
    traits: {
      ko: ['지혜로움', '직관적', '우아함', '분석적', '결단력'],
      en: ['Wise', 'Intuitive', 'Elegant', 'Analytical', 'Determined'],
      zh: ['智慧', '直觉力强', '优雅', '善于分析', '有决心']
    },
    luckyNumbers: [2, 8, 9],
    compatible: ['dragon', 'rooster'],
    incompatible: ['tiger', 'rabbit', 'goat', 'pig']
  },
  {
    id: 'horse',
    nameKo: '말',
    nameEn: 'Horse',
    emoji: '🐴',
    earthlyBranch: '오',
    earthlyBranchHanja: '午',
    order: 7,
    traits: {
      ko: ['활동적', '독립적', '조급함', '자유로움', '열정적'],
      en: ['Energetic', 'Independent', 'Impatient', 'Free-spirited', 'Passionate'],
      zh: ['精力充沛', '独立', '急躁', '自由奔放', '热情']
    },
    luckyNumbers: [2, 3, 7],
    compatible: ['tiger', 'goat', 'rabbit'],
    incompatible: ['rat', 'ox', 'rooster']
  },
  {
    id: 'goat',
    nameKo: '양',
    nameEn: 'Goat',
    emoji: '🐐',
    earthlyBranch: '미',
    earthlyBranchHanja: '未',
    order: 8,
    traits: {
      ko: ['창의적', '예술적', '온화함', '동정심', '내향적'],
      en: ['Creative', 'Artistic', 'Gentle', 'Compassionate', 'Introverted'],
      zh: ['富有创造力', '艺术气质', '温和', '有同情心', '内向']
    },
    luckyNumbers: [2, 7],
    compatible: ['horse', 'rabbit', 'pig'],
    incompatible: ['ox', 'tiger', 'dog']
  },
  {
    id: 'monkey',
    nameKo: '원숭이',
    nameEn: 'Monkey',
    emoji: '🐵',
    earthlyBranch: '신',
    earthlyBranchHanja: '申',
    order: 9,
    traits: {
      ko: ['영리함', '호기심', '장난기', '다재다능', '창의적'],
      en: ['Clever', 'Curious', 'Playful', 'Versatile', 'Creative'],
      zh: ['聪明', '好奇', '爱玩', '多才多艺', '有创造力']
    },
    luckyNumbers: [4, 9],
    compatible: ['ox', 'rabbit'],
    incompatible: ['tiger', 'pig']
  },
  {
    id: 'rooster',
    nameKo: '닭',
    nameEn: 'Rooster',
    emoji: '🐓',
    earthlyBranch: '유',
    earthlyBranchHanja: '酉',
    order: 10,
    traits: {
      ko: ['관찰력', '근면함', '용감함', '솔직함', '자신감'],
      en: ['Observant', 'Hardworking', 'Courageous', 'Honest', 'Confident'],
      zh: ['善于观察', '勤劳', '勇敢', '坦诚', '自信']
    },
    luckyNumbers: [5, 7, 8],
    compatible: ['ox', 'snake'],
    incompatible: ['rat', 'rabbit', 'horse', 'dog']
  },
  {
    id: 'dog',
    nameKo: '개',
    nameEn: 'Dog',
    emoji: '🐕',
    earthlyBranch: '술',
    earthlyBranchHanja: '戌',
    order: 11,
    traits: {
      ko: ['충성심', '정직함', '신뢰성', '이타적', '신중함'],
      en: ['Loyal', 'Honest', 'Reliable', 'Altruistic', 'Cautious'],
      zh: ['忠诚', '诚实', '可靠', '无私', '谨慎']
    },
    luckyNumbers: [3, 4, 9],
    compatible: ['rabbit'],
    incompatible: ['dragon', 'goat', 'rooster']
  },
  {
    id: 'pig',
    nameKo: '돼지',
    nameEn: 'Pig',
    emoji: '🐷',
    earthlyBranch: '해',
    earthlyBranchHanja: '亥',
    order: 12,
    traits: {
      ko: ['관대함', '동정심', '정직함', '너그러움', '성실함'],
      en: ['Generous', 'Compassionate', 'Honest', 'Tolerant', 'Diligent'],
      zh: ['慷慨', '有同情心', '诚实', '宽容', '勤奋']
    },
    luckyNumbers: [2, 5, 8],
    compatible: ['tiger', 'rabbit', 'goat'],
    incompatible: ['snake', 'monkey']
  }
];

// Helper function to get animal by ID
export function getAnimalById(id: string): Animal | undefined {
  return animals.find(animal => animal.id === id);
}

// Helper function to get animal by order (1-12)
export function getAnimalByOrder(order: number): Animal | undefined {
  return animals.find(animal => animal.order === order);
}