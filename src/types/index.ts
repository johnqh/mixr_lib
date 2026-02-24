/**
 * Type definitions for @sudobility/mixr_lib
 *
 * Re-exports types from `@sudobility/mixr_types` and `@sudobility/types`
 * so that consumers only need to import from `@sudobility/mixr_lib`.
 *
 * Types are organized into the following groups:
 * - **Common types** -- generic API and pagination primitives
 * - **Enum / subcategory types** -- equipment and ingredient categories
 * - **Entity types** -- domain models (Equipment, Ingredient, Recipe, etc.)
 * - **Request types** -- payloads sent to the API
 * - **Query param types** -- URL query parameters for list endpoints
 * - **Response types** -- shapes returned by the API
 */

// ============================================================================
// COMMON TYPES (from @sudobility/types)
// ============================================================================

/** A helper that makes all properties of T optional (re-exported from @sudobility/types). */
export type { Optional } from '@sudobility/types';

// ============================================================================
// COMMON TYPES (from @sudobility/mixr_types)
// ============================================================================

/** Standard API response wrapper with optional data, error, and count fields. */
export type { ApiResponse } from '@sudobility/mixr_types';

/** Base shape shared by all API responses. */
export type { BaseResponse } from '@sudobility/mixr_types';

/** Interface for platform-agnostic HTTP clients used by MixrClient. */
export type { NetworkClient } from '@sudobility/mixr_types';

/** Paginated API response with items array and pagination metadata. */
export type { PaginatedResponse } from '@sudobility/mixr_types';

/** Pagination metadata (page, totalPages, totalItems, etc.). */
export type { PaginationInfo } from '@sudobility/mixr_types';

/** Options for requesting a specific page of results. */
export type { PaginationOptions } from '@sudobility/mixr_types';

// ============================================================================
// ENUM / SUBCATEGORY TYPES
// ============================================================================

/**
 * Equipment subcategory string literal union.
 * One of: `'essential'`, `'glassware'`, `'garnish'`, `'advanced'`.
 */
export type { EquipmentSubcategory } from '@sudobility/mixr_types';

/**
 * Ingredient subcategory string literal union.
 * One of: `'spirit'`, `'wine'`, `'other_alcohol'`, `'fruit'`, `'spice'`, `'other'`.
 */
export type { IngredientSubcategory } from '@sudobility/mixr_types';

// ============================================================================
// API RESPONSE WRAPPER
// ============================================================================

/**
 * Generic MIXR API response envelope.
 * Contains `success`, optional `data`, optional `error`, and optional `count`.
 */
export type { MixrApiResponse } from '@sudobility/mixr_types';

// ============================================================================
// ENTITY TYPES (domain models)
// ============================================================================

/** A piece of bar equipment (e.g., shaker, jigger, coupe glass). */
export type { Equipment } from '@sudobility/mixr_types';

/** A cocktail ingredient (e.g., vodka, lime juice, simple syrup). */
export type { Ingredient } from '@sudobility/mixr_types';

/** A mood/vibe for cocktail selection (e.g., celebratory, relaxed). */
export type { Mood } from '@sudobility/mixr_types';

/** User profile with id, email, display name, and timestamps. */
export type { User } from '@sudobility/mixr_types';

/** User equipment and ingredient preference selections. */
export type { UserPreferences } from '@sudobility/mixr_types';

/** An ingredient within a recipe, including the measured amount. */
export type { RecipeIngredient } from '@sudobility/mixr_types';

/** An equipment item referenced by a recipe. */
export type { RecipeEquipment } from '@sudobility/mixr_types';

/** A complete cocktail recipe with mood, ingredients, steps, and equipment. */
export type { Recipe } from '@sudobility/mixr_types';

/** A recipe that includes the userId of its creator. */
export type { RecipeWithUser } from '@sudobility/mixr_types';

/** A user's rating and optional review of a recipe. */
export type { RecipeRating } from '@sudobility/mixr_types';

/** Aggregate rating statistics for a recipe (average, count, distribution). */
export type { RatingAggregate } from '@sudobility/mixr_types';

// ============================================================================
// REQUEST TYPES (API payloads)
// ============================================================================

/** Payload for updating the current user's display name. */
export type { UpdateUserRequest } from '@sudobility/mixr_types';

/** Payload for updating user equipment and ingredient preferences. */
export type { UpdateUserPreferencesRequest } from '@sudobility/mixr_types';

/** Payload for adding a recipe to the user's favorites. */
export type { AddFavoriteRequest } from '@sudobility/mixr_types';

/** Payload for submitting a star rating and optional review. */
export type { SubmitRatingRequest } from '@sudobility/mixr_types';

/** Payload for generating a new recipe based on equipment, ingredients, and mood. */
export type { GenerateRecipeRequest } from '@sudobility/mixr_types';

// ============================================================================
// QUERY PARAM TYPES
// ============================================================================

/** Query parameters for filtering equipment lists by subcategory. */
export type { EquipmentQueryParams } from '@sudobility/mixr_types';

/** Query parameters for filtering ingredient lists by subcategory. */
export type { IngredientQueryParams } from '@sudobility/mixr_types';

/** Query parameters for paginated list endpoints (limit, offset). */
export type { PaginationQueryParams } from '@sudobility/mixr_types';

/** Query parameters for rating lists (limit, offset, sort order). */
export type { RatingListParams } from '@sudobility/mixr_types';

// ============================================================================
// RESPONSE TYPES
// ============================================================================

/** Response containing an array of equipment items. */
export type { EquipmentListResponse } from '@sudobility/mixr_types';

/** Response containing a single equipment item. */
export type { EquipmentResponse } from '@sudobility/mixr_types';

/** Response containing the list of equipment subcategory strings. */
export type { EquipmentSubcategoriesResponse } from '@sudobility/mixr_types';

/** Response containing an array of ingredient items. */
export type { IngredientListResponse } from '@sudobility/mixr_types';

/** Response containing a single ingredient item. */
export type { IngredientResponse } from '@sudobility/mixr_types';

/** Response containing the list of ingredient subcategory strings. */
export type { IngredientSubcategoriesResponse } from '@sudobility/mixr_types';

/** Response containing an array of mood items. */
export type { MoodListResponse } from '@sudobility/mixr_types';

/** Response containing a single mood item. */
export type { MoodResponse } from '@sudobility/mixr_types';

/** Response containing an array of recipe items. */
export type { RecipeListResponse } from '@sudobility/mixr_types';

/** Response containing a single recipe item. */
export type { RecipeResponse } from '@sudobility/mixr_types';

/** Response containing the current user's profile. */
export type { UserResponse } from '@sudobility/mixr_types';

/** Response containing the current user's preferences. */
export type { UserPreferencesResponse } from '@sudobility/mixr_types';

/** Response from adding a recipe to favorites. */
export type { AddFavoriteResponse } from '@sudobility/mixr_types';

/** Response from removing a recipe from favorites. */
export type { RemoveFavoriteResponse } from '@sudobility/mixr_types';

/** Response containing a single recipe rating. */
export type { RecipeRatingResponse } from '@sudobility/mixr_types';

/** Response containing an array of recipe ratings. */
export type { RecipeRatingListResponse } from '@sudobility/mixr_types';

/** Response containing rating aggregate statistics. */
export type { RatingAggregateResponse } from '@sudobility/mixr_types';

/** Response from deleting a recipe rating. */
export type { DeleteRatingResponse } from '@sudobility/mixr_types';

/** Response from the health check endpoint. */
export type { HealthResponse } from '@sudobility/mixr_types';

/** Response from the version endpoint. */
export type { VersionResponse } from '@sudobility/mixr_types';

// ============================================================================
// CONSTANTS
// ============================================================================

/** Array of all valid equipment subcategory values. */
export { EQUIPMENT_SUBCATEGORIES } from '@sudobility/mixr_types';

/** Array of all valid ingredient subcategory values. */
export { INGREDIENT_SUBCATEGORIES } from '@sudobility/mixr_types';
