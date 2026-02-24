/**
 * Utility functions for @sudobility/mixr_lib
 *
 * This module provides helper functions for formatting, validation,
 * and common operations on MIXR domain data.
 */

import type { RatingAggregate, Recipe, RecipeIngredient } from '../types';

// ============================================================================
// DATA FORMATTING
// ============================================================================

/**
 * Formats MIXR data as a pretty-printed JSON string.
 *
 * Safely handles circular references and non-serializable values
 * by returning a fallback string instead of throwing.
 *
 * @param data - The data to format. Can be any value including null/undefined.
 * @returns A formatted JSON string, or `"[unserializable]"` if serialization fails.
 *
 * @example
 * ```ts
 * const recipe = { name: 'Mojito', ingredients: [...] };
 * console.log(formatMixrData(recipe));
 * // {
 * //   "name": "Mojito",
 * //   "ingredients": [...]
 * // }
 * ```
 */
export function formatMixrData(data: unknown): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return '[unserializable]';
  }
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================

/**
 * Validates that a string input is non-empty after trimming whitespace.
 *
 * Use this for basic form field validation before submitting to the API.
 * For domain-specific validation (e.g., rating values, recipe names),
 * use the dedicated validators below.
 *
 * @param input - The string to validate.
 * @returns `true` if the trimmed input has at least one character.
 *
 * @example
 * ```ts
 * validateMixrInput('Mojito');   // true
 * validateMixrInput('  ');       // false
 * validateMixrInput('');         // false
 * ```
 */
export function validateMixrInput(input: string): boolean {
  return input.trim().length > 0;
}

/**
 * Validates a display name for user profile updates.
 *
 * Display names must be between {@link MIN_DISPLAY_NAME_LENGTH} and
 * {@link MAX_DISPLAY_NAME_LENGTH} characters after trimming.
 *
 * @param name - The display name to validate.
 * @returns `true` if the name meets length requirements.
 *
 * @example
 * ```ts
 * validateDisplayName('John');    // true
 * validateDisplayName('');        // false
 * validateDisplayName('AB');      // false (too short)
 * ```
 */
export function validateDisplayName(name: string): boolean {
  const trimmed = name.trim();
  return (
    trimmed.length >= MIN_DISPLAY_NAME_LENGTH &&
    trimmed.length <= MAX_DISPLAY_NAME_LENGTH
  );
}

/**
 * Validates a star rating value.
 *
 * Ratings must be integers between {@link MIN_STAR_RATING} and
 * {@link MAX_STAR_RATING} inclusive.
 *
 * @param stars - The rating value to validate.
 * @returns `true` if the rating is a valid integer in the allowed range.
 *
 * @example
 * ```ts
 * validateStarRating(5);    // true
 * validateStarRating(0);    // false
 * validateStarRating(3.5);  // false
 * ```
 */
export function validateStarRating(stars: number): boolean {
  return (
    Number.isInteger(stars) &&
    stars >= MIN_STAR_RATING &&
    stars <= MAX_STAR_RATING
  );
}

/**
 * Validates a review text string.
 *
 * Reviews are optional but when provided must not exceed
 * {@link MAX_REVIEW_LENGTH} characters.
 *
 * @param review - The review text to validate. Can be undefined (valid).
 * @returns `true` if the review is undefined/empty or within the length limit.
 *
 * @example
 * ```ts
 * validateReviewText(undefined);               // true
 * validateReviewText('Great cocktail!');        // true
 * validateReviewText('x'.repeat(2001));         // false
 * ```
 */
export function validateReviewText(review: string | undefined): boolean {
  if (review === undefined || review === '') {
    return true;
  }
  return review.length <= MAX_REVIEW_LENGTH;
}

// ============================================================================
// RECIPE UTILITIES
// ============================================================================

/**
 * Formats a recipe's ingredient list as a human-readable string array.
 *
 * Each entry combines the ingredient name with its amount, e.g. `"Lime Juice (30ml)"`.
 * Ingredients without an amount show just the name.
 *
 * @param ingredients - Array of recipe ingredients with amounts.
 * @returns Array of formatted ingredient strings.
 *
 * @example
 * ```ts
 * const ingredients = [
 *   { id: 1, name: 'Vodka', icon: null, amount: '60ml' },
 *   { id: 2, name: 'Ice', icon: null, amount: '' },
 * ];
 * formatIngredientList(ingredients);
 * // ['Vodka (60ml)', 'Ice']
 * ```
 */
export function formatIngredientList(
  ingredients: readonly RecipeIngredient[]
): string[] {
  return ingredients.map(ingredient => {
    const amount = ingredient.amount.trim();
    if (amount.length > 0) {
      return `${ingredient.name} (${amount})`;
    }
    return ingredient.name;
  });
}

/**
 * Counts the total number of ingredients in a recipe.
 *
 * @param recipe - The recipe to count ingredients for.
 * @returns The number of ingredients.
 *
 * @example
 * ```ts
 * getIngredientCount(recipe); // 5
 * ```
 */
export function getIngredientCount(
  recipe: Pick<Recipe, 'ingredients'>
): number {
  return recipe.ingredients.length;
}

/**
 * Counts the total number of steps in a recipe.
 *
 * @param recipe - The recipe to count steps for.
 * @returns The number of steps.
 *
 * @example
 * ```ts
 * getStepCount(recipe); // 4
 * ```
 */
export function getStepCount(recipe: Pick<Recipe, 'steps'>): number {
  return recipe.steps.length;
}

/**
 * Formats a recipe's steps as numbered instructions.
 *
 * @param steps - Array of step description strings.
 * @returns Array of numbered step strings (e.g., `"1. Muddle the mint..."`).
 *
 * @example
 * ```ts
 * formatRecipeSteps(['Muddle mint', 'Add rum', 'Stir']);
 * // ['1. Muddle mint', '2. Add rum', '3. Stir']
 * ```
 */
export function formatRecipeSteps(steps: readonly string[]): string[] {
  return steps.map((step, index) => `${index + 1}. ${step}`);
}

/**
 * Formats a rating aggregate's average as a display string.
 *
 * Shows one decimal place with the total count, e.g. `"4.2 (15 ratings)"`.
 * Returns `"No ratings"` when there are zero ratings.
 *
 * @param aggregate - The rating aggregate data.
 * @returns A formatted rating display string.
 *
 * @example
 * ```ts
 * formatRatingDisplay({ average_rating: 4.2, total_ratings: 15, ... });
 * // '4.2 (15 ratings)'
 *
 * formatRatingDisplay({ average_rating: 0, total_ratings: 0, ... });
 * // 'No ratings'
 * ```
 */
export function formatRatingDisplay(
  aggregate: Pick<RatingAggregate, 'average_rating' | 'total_ratings'>
): string {
  if (aggregate.total_ratings === 0) {
    return 'No ratings';
  }
  const avg = aggregate.average_rating.toFixed(1);
  const count = aggregate.total_ratings;
  const label = count === 1 ? 'rating' : 'ratings';
  return `${avg} (${count} ${label})`;
}

/**
 * Extracts unique equipment names from a recipe.
 *
 * @param recipe - The recipe to extract equipment names from.
 * @returns Array of unique equipment name strings.
 *
 * @example
 * ```ts
 * getEquipmentNames(recipe); // ['Shaker', 'Jigger', 'Coupe Glass']
 * ```
 */
export function getEquipmentNames(recipe: Pick<Recipe, 'equipment'>): string[] {
  return [...new Set(recipe.equipment.map(e => e.name))];
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Minimum allowed star rating value.
 * Ratings must be integers from 1 to 5.
 */
export const MIN_STAR_RATING = 1;

/**
 * Maximum allowed star rating value.
 * Ratings must be integers from 1 to 5.
 */
export const MAX_STAR_RATING = 5;

/**
 * Maximum allowed review text length in characters.
 */
export const MAX_REVIEW_LENGTH = 2000;

/**
 * Minimum allowed display name length in characters.
 */
export const MIN_DISPLAY_NAME_LENGTH = 3;

/**
 * Maximum allowed display name length in characters.
 */
export const MAX_DISPLAY_NAME_LENGTH = 50;

/**
 * Default number of items per page for paginated requests.
 */
export const DEFAULT_PAGE_LIMIT = 20;

/**
 * Maximum number of items per page for paginated requests.
 */
export const MAX_PAGE_LIMIT = 100;

/**
 * Default sort order for rating lists.
 */
export const DEFAULT_RATING_SORT: 'newest' | 'oldest' | 'highest' | 'lowest' =
  'newest';
