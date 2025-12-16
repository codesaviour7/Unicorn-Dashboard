export const PAGINATION = {
  PAGE_SIZE: 5,
  MAX_VISIBLE_PAGES: 7,
}

export const STATUS = {
  BABY: {
    MIN_AGE: 0,
    MAX_AGE: 8,
    LABEL: 'Baby Unicorn',
    EMOJI: '👶',
    CLASS: 'bg-yellow-100 text-yellow-800',
  },
  MATURE: {
    MIN_AGE: 9,
    MAX_AGE: 25,
    LABEL: 'Mature Unicorn',
    EMOJI: '🦄',
    CLASS: 'bg-green-100 text-green-800',
  },
  OLD: {
    MIN_AGE: 26,
    MAX_AGE: Infinity,
    LABEL: 'Old Unicorn',
    EMOJI: '👴',
    CLASS: 'bg-purple-100 text-purple-800',
  },
}

export const CARD_COLORS = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
]

export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 30,
  MIN_AGE: 0,
  MAX_AGE: 250,
}

export const TOAST = {
  DEFAULT_DURATION: 5000,
}

