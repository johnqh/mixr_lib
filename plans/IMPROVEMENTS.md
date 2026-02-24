# Improvement Plans for @sudobility/mixr_lib

## Priority 1 - High Impact

### 1. Replace Placeholder Implementations with Real Business Logic
- ✅ `initializeMixrLib()` now performs actual initialization: validates the client argument, stores the client reference, tracks initialization state, and warns on re-initialization.
- ✅ `formatMixrData()` now handles circular references gracefully (returns `"[unserializable]"` instead of throwing).
- ✅ `validateMixrInput()` now trims whitespace before checking (whitespace-only strings are rejected). Added domain-specific validators: `validateDisplayName()`, `validateStarRating()`, `validateReviewText()`.
- `useMixrLibPlaceholder()` is still a placeholder hook -- real domain hooks require the Manager Pattern (item 2).
- ✅ Added `isMixrLibInitialized()` and `getMixrClient()` for checking initialization state and retrieving the stored client.
- Remaining: Real business logic like recipe filtering, ingredient compatibility checks, mood-based filtering, and preference management still need to be implemented as domain requirements solidify.

### 2. Add Real Business Logic Hooks (Manager Pattern)
- **Skipped** -- Requires major architectural changes and deep understanding of the `mixr` app's state management patterns. Should be done when actively refactoring the `mixr` app to consume `mixr_lib`.
- The `mixr_lib` package is meant to sit between `mixr_client` (API hooks) and `mixr` (UI), matching the architecture of `whisperly_lib` which has 6 manager hooks.
- Currently, the `mixr` app bypasses `mixr_lib` entirely and imports hooks directly from `mixr_client` or defines its own hooks in `src/hooks/`.
- Manager hooks should be added for: recipe management (with store sync), user preferences, equipment/ingredient selection state, and favorite management.
- Without this layer, the `mixr` app duplicates state management logic that should be centralized in the lib.

### 3. Add Zustand Stores for Application State
- **Skipped** -- Requires major architectural changes. Should be done alongside the Manager Pattern hooks (item 2).
- Unlike `whisperly_lib` which has 4 Zustand stores (project, dictionary, settings, analytics), `mixr_lib` has zero stores.
- The `mixr_client` package provides a `createRecipeStore` but no equivalent stores exist for user preferences, selected equipment/ingredients, or current mood selection.
- Stores for recipe generation wizard state, user onboarding progress, and selected filters would centralize state management currently scattered across the `mixr` app's components.

## Priority 2 - Medium Impact

### 4. Improve Test Quality Beyond Placeholder Tests ✅
- ✅ Updated business tests with 15 tests covering initialization, re-initialization, error handling, state queries, and reset.
- ✅ Updated utils tests with 57 tests covering all new utility functions, validators, recipe helpers, and constants.
- ✅ Added test fixtures for common MIXR data shapes (mock recipe, mock ingredients, mock rating aggregate) reused across test files.
- ✅ Total: 88 tests across 4 test files, all passing.

### 5. Add JSDoc to All Exports Including Re-exports ✅
- ✅ All 70+ type re-exports in `src/types/index.ts` now have individual JSDoc comments explaining each type.
- ✅ Types are organized with section headers: Common types, Enum types, Entity types, Request types, Query param types, Response types.
- ✅ All utility functions have JSDoc with `@param`, `@returns`, and `@example` tags.
- ✅ All constants have JSDoc explaining their purpose and usage.
- ✅ Business functions (`initializeMixrLib`, `isMixrLibInitialized`, `getMixrClient`) have full JSDoc with `@throws` and `@example`.
- ✅ The `useMixrLibPlaceholder` hook has JSDoc with usage example.

### 6. Define Clear Boundaries Between Client and Lib Responsibilities
- **Skipped** -- Documentation-only item that should be done when the Manager Pattern (item 2) and Zustand stores (item 3) are implemented to provide concrete examples.
- The current architecture diagram shows `mixr_lib` between `mixr_client` and `mixr`, but the lib only re-exports types and provides placeholder utilities.
- Document what logic belongs in `mixr_lib` vs `mixr_client` vs the `mixr` app -- e.g., recipe filtering/sorting logic, preference-based recommendations, and wizard state management belong in `mixr_lib`.
- Without clear boundaries, developers will continue placing business logic in the app layer.

## Priority 3 - Nice to Have

### 7. Add Recipe Utility Functions ✅
- ✅ `formatIngredientList()` -- formats ingredients with amounts as readable strings (e.g., "Vodka (60ml)").
- ✅ `formatRecipeSteps()` -- numbers recipe steps (e.g., "1. Muddle mint...").
- ✅ `formatRatingDisplay()` -- formats rating aggregates as display strings (e.g., "4.2 (15 ratings)").
- ✅ `getIngredientCount()` -- counts ingredients in a recipe.
- ✅ `getStepCount()` -- counts steps in a recipe.
- ✅ `getEquipmentNames()` -- extracts unique equipment names from a recipe.
- Remaining: `calculateTotalPrepTime()` and `groupStepsByPhase()` need recipe schema changes (prep time and phase fields) before they can be implemented.

### 8. Add Configuration/Constants Module ✅
- ✅ Added `MIN_STAR_RATING` (1) and `MAX_STAR_RATING` (5) -- valid star rating range.
- ✅ Added `MAX_REVIEW_LENGTH` (2000) -- maximum review text length.
- ✅ Added `MIN_DISPLAY_NAME_LENGTH` (3) and `MAX_DISPLAY_NAME_LENGTH` (50) -- display name constraints.
- ✅ Added `DEFAULT_PAGE_LIMIT` (20) and `MAX_PAGE_LIMIT` (100) -- pagination defaults.
- ✅ Added `DEFAULT_RATING_SORT` ("newest") -- default sort for rating lists.
- ✅ Added `verify` script to `package.json` (`bun run typecheck && bun run lint && bun run test && bun run build`).
- All constants are exported from the main barrel file and available to consumers.
