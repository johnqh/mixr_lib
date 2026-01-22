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

export { initializeMixrLib, MIXR_LIB_VERSION } from './business';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Re-export all types from @sudobility/mixr_types
export type {
  Optional,
  ApiResponse,
  BaseResponse,
  NetworkClient,
  PaginatedResponse,
  PaginationInfo,
  PaginationOptions,
  EquipmentSubcategory,
  IngredientSubcategory,
  MixrApiResponse,
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
  UpdateUserRequest,
  UpdateUserPreferencesRequest,
  AddFavoriteRequest,
  SubmitRatingRequest,
  GenerateRecipeRequest,
  EquipmentQueryParams,
  IngredientQueryParams,
  PaginationQueryParams,
  RatingListParams,
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

export { formatMixrData, validateMixrInput } from './utils';

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

export { useMixrLibPlaceholder } from './hooks';
