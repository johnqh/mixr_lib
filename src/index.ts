/**
 * @sudobility/mixr_lib - Shared utilities and business logic for MIXR application
 *
 * This library provides common functionality, hooks, and utilities for MIXR projects.
 * It depends on @sudobility/types, @sudobility/di, and @sudobility/mixr_client.
 *
 * @packageDocumentation
 */

// ============================================================================
// BUSINESS LOGIC EXPORTS
// ============================================================================

export {
  initializeMixrLib,
  isMixrLibInitialized,
  getMixrClient,
  MIXR_LIB_VERSION,
} from './business';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Re-export all types from @sudobility/mixr_types (grouped and documented in ./types)
export type {
  // Common types
  Optional,
  ApiResponse,
  BaseResponse,
  NetworkClient,
  PaginatedResponse,
  PaginationInfo,
  PaginationOptions,

  // Enum / subcategory types
  EquipmentSubcategory,
  IngredientSubcategory,

  // API response wrapper
  MixrApiResponse,

  // Entity types
  Equipment,
  Ingredient,
  Mood,
  User,
  UserPreferences,
  RecipeIngredient,
  RecipeEquipment,
  Recipe,
  RecipeWithUser,
  RecipeRating,
  RatingAggregate,

  // Request types
  UpdateUserRequest,
  UpdateUserPreferencesRequest,
  AddFavoriteRequest,
  SubmitRatingRequest,
  GenerateRecipeRequest,

  // Query param types
  EquipmentQueryParams,
  IngredientQueryParams,
  PaginationQueryParams,
  RatingListParams,

  // Response types
  EquipmentListResponse,
  EquipmentResponse,
  EquipmentSubcategoriesResponse,
  IngredientListResponse,
  IngredientResponse,
  IngredientSubcategoriesResponse,
  MoodListResponse,
  MoodResponse,
  RecipeListResponse,
  RecipeResponse,
  UserResponse,
  UserPreferencesResponse,
  AddFavoriteResponse,
  RemoveFavoriteResponse,
  RecipeRatingResponse,
  RecipeRatingListResponse,
  RatingAggregateResponse,
  DeleteRatingResponse,
  HealthResponse,
  VersionResponse,
} from './types';

export { EQUIPMENT_SUBCATEGORIES, INGREDIENT_SUBCATEGORIES } from './types';

// Also re-export NetworkResponse from @sudobility/types
export type { NetworkResponse } from '@sudobility/types';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  // Formatting utilities
  formatMixrData,
  formatIngredientList,
  formatRecipeSteps,
  formatRatingDisplay,

  // Validation utilities
  validateMixrInput,
  validateDisplayName,
  validateStarRating,
  validateReviewText,

  // Recipe helpers
  getIngredientCount,
  getStepCount,
  getEquipmentNames,

  // Constants
  MIN_STAR_RATING,
  MAX_STAR_RATING,
  MAX_REVIEW_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  DEFAULT_PAGE_LIMIT,
  MAX_PAGE_LIMIT,
  DEFAULT_RATING_SORT,
} from './utils';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export { useMixrLibPlaceholder } from './hooks';
