/**
 * Type definitions for @sudobility/mixr_lib
 *
 * Re-exports types from @sudobility/mixr_types for library consumers.
 */

// Re-export commonly used types from @sudobility/types
export type { Optional } from '@sudobility/types';

// Re-export all types from @sudobility/mixr_types
export type {
  // Common types
  ApiResponse,
  BaseResponse,
  NetworkClient,
  PaginatedResponse,
  PaginationInfo,
  PaginationOptions,

  // Enum types
  EquipmentSubcategory,
  IngredientSubcategory,

  // API Response wrapper
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
} from '@sudobility/mixr_types';

// Re-export constants
export {
  EQUIPMENT_SUBCATEGORIES,
  INGREDIENT_SUBCATEGORIES,
} from '@sudobility/mixr_types';
