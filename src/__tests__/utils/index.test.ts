import { describe, it, expect } from 'vitest';
import {
  formatMixrData,
  validateMixrInput,
  validateDisplayName,
  validateStarRating,
  validateReviewText,
  formatIngredientList,
  formatRecipeSteps,
  formatRatingDisplay,
  getIngredientCount,
  getStepCount,
  getEquipmentNames,
  MIN_STAR_RATING,
  MAX_STAR_RATING,
  MAX_REVIEW_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  DEFAULT_PAGE_LIMIT,
  MAX_PAGE_LIMIT,
  DEFAULT_RATING_SORT,
} from '../../utils';
import type {
  RecipeIngredient,
  RatingAggregate,
  Recipe,
} from '../../types';

// ============================================================================
// TEST FIXTURES
// ============================================================================

const mockIngredients: RecipeIngredient[] = [
  { id: 1, name: 'White Rum', icon: null, amount: '60ml' },
  { id: 2, name: 'Fresh Lime Juice', icon: null, amount: '30ml' },
  { id: 3, name: 'Simple Syrup', icon: null, amount: '15ml' },
  { id: 4, name: 'Fresh Mint Leaves', icon: null, amount: '6-8 leaves' },
  { id: 5, name: 'Soda Water', icon: null, amount: '' },
];

const mockRecipe: Recipe = {
  id: 1,
  name: 'Mojito',
  description: 'A refreshing Cuban cocktail',
  moodId: 3,
  createdAt: '2024-01-01T00:00:00Z',
  mood: {
    id: 3,
    emoji: '🌴',
    name: 'Relaxed',
    description: 'Laid back vibes',
    exampleDrinks: 'Mojito, Daiquiri',
    imageName: null,
    createdAt: '2024-01-01T00:00:00Z',
  },
  ingredients: mockIngredients,
  steps: [
    'Muddle mint leaves with simple syrup in a glass',
    'Add lime juice and rum',
    'Fill with ice and top with soda water',
    'Stir gently and garnish with mint sprig',
  ],
  equipment: [
    { id: 1, name: 'Muddler', icon: null },
    { id: 2, name: 'Highball Glass', icon: null },
    { id: 3, name: 'Jigger', icon: null },
  ],
};

const mockRatingAggregate: RatingAggregate = {
  recipe_id: 1,
  average_rating: 4.3,
  total_ratings: 42,
  rating_distribution: {
    '1': 1,
    '2': 2,
    '3': 5,
    '4': 15,
    '5': 19,
  },
};

// ============================================================================
// formatMixrData
// ============================================================================

describe('formatMixrData', () => {
  it('should format an object as pretty-printed JSON', () => {
    const data = { name: 'Mojito', ingredients: ['rum', 'mint', 'lime'] };
    const result = formatMixrData(data);

    expect(result).toBe(JSON.stringify(data, null, 2));
    expect(result).toContain('"name": "Mojito"');
    expect(result).toContain('"ingredients"');
  });

  it('should format a simple string', () => {
    expect(formatMixrData('hello')).toBe('"hello"');
  });

  it('should format a number', () => {
    expect(formatMixrData(42)).toBe('42');
  });

  it('should format null', () => {
    expect(formatMixrData(null)).toBe('null');
  });

  it('should format undefined', () => {
    expect(formatMixrData(undefined)).toBe(undefined);
  });

  it('should format an array', () => {
    const data = [1, 2, 3];
    expect(formatMixrData(data)).toBe(JSON.stringify(data, null, 2));
  });

  it('should format nested objects', () => {
    const data = {
      recipe: { name: 'Margarita', mood: { id: 1, name: 'Celebratory' } },
    };
    const result = formatMixrData(data);
    expect(result).toContain('"recipe"');
    expect(result).toContain('"Margarita"');
  });

  it('should return "[unserializable]" for circular references', () => {
    const obj: Record<string, unknown> = {};
    obj['self'] = obj;
    expect(formatMixrData(obj)).toBe('[unserializable]');
  });
});

// ============================================================================
// validateMixrInput
// ============================================================================

describe('validateMixrInput', () => {
  it('should return true for non-empty strings', () => {
    expect(validateMixrInput('hello')).toBe(true);
    expect(validateMixrInput('a')).toBe(true);
    expect(validateMixrInput('test input')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(validateMixrInput('')).toBe(false);
  });

  it('should return false for whitespace-only strings', () => {
    expect(validateMixrInput(' ')).toBe(false);
    expect(validateMixrInput('   ')).toBe(false);
    expect(validateMixrInput('\t')).toBe(false);
    expect(validateMixrInput('\n')).toBe(false);
  });

  it('should return true for strings with special characters', () => {
    expect(validateMixrInput('!@#$%')).toBe(true);
    expect(validateMixrInput('café')).toBe(true);
  });

  it('should trim leading/trailing whitespace before validating', () => {
    expect(validateMixrInput('  hello  ')).toBe(true);
    expect(validateMixrInput('  ')).toBe(false);
  });
});

// ============================================================================
// validateDisplayName
// ============================================================================

describe('validateDisplayName', () => {
  it('should accept valid display names', () => {
    expect(validateDisplayName('John')).toBe(true);
    expect(validateDisplayName('Jane Doe')).toBe(true);
    expect(validateDisplayName('abc')).toBe(true);
  });

  it('should reject empty strings', () => {
    expect(validateDisplayName('')).toBe(false);
  });

  it('should reject names shorter than minimum length', () => {
    expect(validateDisplayName('AB')).toBe(false);
    expect(validateDisplayName('A')).toBe(false);
  });

  it('should reject names longer than maximum length', () => {
    const longName = 'A'.repeat(MAX_DISPLAY_NAME_LENGTH + 1);
    expect(validateDisplayName(longName)).toBe(false);
  });

  it('should accept names at exactly minimum length', () => {
    const exactMin = 'A'.repeat(MIN_DISPLAY_NAME_LENGTH);
    expect(validateDisplayName(exactMin)).toBe(true);
  });

  it('should accept names at exactly maximum length', () => {
    const exactMax = 'A'.repeat(MAX_DISPLAY_NAME_LENGTH);
    expect(validateDisplayName(exactMax)).toBe(true);
  });

  it('should trim whitespace before validating', () => {
    expect(validateDisplayName('  John  ')).toBe(true);
    expect(validateDisplayName('   ')).toBe(false);
  });
});

// ============================================================================
// validateStarRating
// ============================================================================

describe('validateStarRating', () => {
  it('should accept valid ratings (1-5)', () => {
    expect(validateStarRating(1)).toBe(true);
    expect(validateStarRating(2)).toBe(true);
    expect(validateStarRating(3)).toBe(true);
    expect(validateStarRating(4)).toBe(true);
    expect(validateStarRating(5)).toBe(true);
  });

  it('should reject zero', () => {
    expect(validateStarRating(0)).toBe(false);
  });

  it('should reject negative numbers', () => {
    expect(validateStarRating(-1)).toBe(false);
  });

  it('should reject numbers above maximum', () => {
    expect(validateStarRating(6)).toBe(false);
  });

  it('should reject non-integer values', () => {
    expect(validateStarRating(3.5)).toBe(false);
    expect(validateStarRating(4.9)).toBe(false);
    expect(validateStarRating(0.1)).toBe(false);
  });

  it('should reject NaN', () => {
    expect(validateStarRating(NaN)).toBe(false);
  });

  it('should reject Infinity', () => {
    expect(validateStarRating(Infinity)).toBe(false);
    expect(validateStarRating(-Infinity)).toBe(false);
  });
});

// ============================================================================
// validateReviewText
// ============================================================================

describe('validateReviewText', () => {
  it('should accept undefined (review is optional)', () => {
    expect(validateReviewText(undefined)).toBe(true);
  });

  it('should accept empty string', () => {
    expect(validateReviewText('')).toBe(true);
  });

  it('should accept valid review text', () => {
    expect(validateReviewText('Great cocktail!')).toBe(true);
    expect(validateReviewText('A')).toBe(true);
  });

  it('should accept review at exactly max length', () => {
    const maxReview = 'A'.repeat(MAX_REVIEW_LENGTH);
    expect(validateReviewText(maxReview)).toBe(true);
  });

  it('should reject review exceeding max length', () => {
    const tooLong = 'A'.repeat(MAX_REVIEW_LENGTH + 1);
    expect(validateReviewText(tooLong)).toBe(false);
  });
});

// ============================================================================
// formatIngredientList
// ============================================================================

describe('formatIngredientList', () => {
  it('should format ingredients with amounts', () => {
    const result = formatIngredientList(mockIngredients);

    expect(result[0]).toBe('White Rum (60ml)');
    expect(result[1]).toBe('Fresh Lime Juice (30ml)');
    expect(result[2]).toBe('Simple Syrup (15ml)');
    expect(result[3]).toBe('Fresh Mint Leaves (6-8 leaves)');
  });

  it('should format ingredients without amounts (name only)', () => {
    const result = formatIngredientList(mockIngredients);
    expect(result[4]).toBe('Soda Water');
  });

  it('should handle empty ingredient list', () => {
    expect(formatIngredientList([])).toEqual([]);
  });

  it('should trim whitespace from amounts', () => {
    const ingredients: RecipeIngredient[] = [
      { id: 1, name: 'Vodka', icon: null, amount: '  60ml  ' },
    ];
    const result = formatIngredientList(ingredients);
    expect(result[0]).toBe('Vodka (60ml)');
  });

  it('should handle amount that is only whitespace as no amount', () => {
    const ingredients: RecipeIngredient[] = [
      { id: 1, name: 'Ice', icon: null, amount: '   ' },
    ];
    const result = formatIngredientList(ingredients);
    expect(result[0]).toBe('Ice');
  });
});

// ============================================================================
// getIngredientCount & getStepCount
// ============================================================================

describe('getIngredientCount', () => {
  it('should return the number of ingredients', () => {
    expect(getIngredientCount(mockRecipe)).toBe(5);
  });

  it('should return 0 for empty ingredients', () => {
    expect(getIngredientCount({ ingredients: [] })).toBe(0);
  });
});

describe('getStepCount', () => {
  it('should return the number of steps', () => {
    expect(getStepCount(mockRecipe)).toBe(4);
  });

  it('should return 0 for empty steps', () => {
    expect(getStepCount({ steps: [] })).toBe(0);
  });
});

// ============================================================================
// formatRecipeSteps
// ============================================================================

describe('formatRecipeSteps', () => {
  it('should number each step starting from 1', () => {
    const steps = ['Muddle mint', 'Add rum', 'Stir'];
    const result = formatRecipeSteps(steps);

    expect(result).toEqual([
      '1. Muddle mint',
      '2. Add rum',
      '3. Stir',
    ]);
  });

  it('should handle empty steps array', () => {
    expect(formatRecipeSteps([])).toEqual([]);
  });

  it('should handle single step', () => {
    expect(formatRecipeSteps(['Pour and serve'])).toEqual([
      '1. Pour and serve',
    ]);
  });
});

// ============================================================================
// formatRatingDisplay
// ============================================================================

describe('formatRatingDisplay', () => {
  it('should format rating with count (plural)', () => {
    const result = formatRatingDisplay(mockRatingAggregate);
    expect(result).toBe('4.3 (42 ratings)');
  });

  it('should use singular "rating" for count of 1', () => {
    const result = formatRatingDisplay({
      average_rating: 5.0,
      total_ratings: 1,
    });
    expect(result).toBe('5.0 (1 rating)');
  });

  it('should return "No ratings" for zero ratings', () => {
    const result = formatRatingDisplay({
      average_rating: 0,
      total_ratings: 0,
    });
    expect(result).toBe('No ratings');
  });

  it('should format to one decimal place', () => {
    const result = formatRatingDisplay({
      average_rating: 3.666,
      total_ratings: 10,
    });
    expect(result).toBe('3.7 (10 ratings)');
  });

  it('should show .0 for whole number averages', () => {
    const result = formatRatingDisplay({
      average_rating: 4,
      total_ratings: 5,
    });
    expect(result).toBe('4.0 (5 ratings)');
  });
});

// ============================================================================
// getEquipmentNames
// ============================================================================

describe('getEquipmentNames', () => {
  it('should extract equipment names', () => {
    const result = getEquipmentNames(mockRecipe);
    expect(result).toEqual(['Muddler', 'Highball Glass', 'Jigger']);
  });

  it('should return empty array for no equipment', () => {
    expect(getEquipmentNames({ equipment: [] })).toEqual([]);
  });

  it('should deduplicate equipment names', () => {
    const recipe = {
      equipment: [
        { id: 1, name: 'Shaker', icon: null },
        { id: 2, name: 'Shaker', icon: null },
        { id: 3, name: 'Jigger', icon: null },
      ],
    };
    const result = getEquipmentNames(recipe);
    expect(result).toEqual(['Shaker', 'Jigger']);
  });
});

// ============================================================================
// CONSTANTS
// ============================================================================

describe('constants', () => {
  it('should have correct star rating range', () => {
    expect(MIN_STAR_RATING).toBe(1);
    expect(MAX_STAR_RATING).toBe(5);
  });

  it('should have a reasonable max review length', () => {
    expect(MAX_REVIEW_LENGTH).toBe(2000);
  });

  it('should have display name length constraints', () => {
    expect(MIN_DISPLAY_NAME_LENGTH).toBe(3);
    expect(MAX_DISPLAY_NAME_LENGTH).toBe(50);
    expect(MIN_DISPLAY_NAME_LENGTH).toBeLessThan(MAX_DISPLAY_NAME_LENGTH);
  });

  it('should have pagination defaults', () => {
    expect(DEFAULT_PAGE_LIMIT).toBe(20);
    expect(MAX_PAGE_LIMIT).toBe(100);
    expect(DEFAULT_PAGE_LIMIT).toBeLessThanOrEqual(MAX_PAGE_LIMIT);
  });

  it('should have default rating sort', () => {
    expect(DEFAULT_RATING_SORT).toBe('newest');
  });
});
