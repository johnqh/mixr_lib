# Improvement Plans for @sudobility/mixr_lib

## Priority 1 - High Impact

### 1. Replace Placeholder Implementations with Real Business Logic
- `initializeMixrLib()` is a placeholder that only calls `console.log` -- it performs no actual initialization.
- `formatMixrData()` is just `JSON.stringify(data, null, 2)` -- a trivial wrapper with no mixr-specific formatting.
- `validateMixrInput()` only checks `input.length > 0` -- no actual validation logic for MIXR domain inputs.
- `useMixrLibPlaceholder()` is an example hook that logs to console and provides no real functionality.
- The entire library exports are essentially stubs. Real business logic (e.g., recipe formatting, ingredient compatibility checks, mood-based filtering, preference management) should replace these placeholders.

### 2. Add Real Business Logic Hooks (Manager Pattern)
- The `mixr_lib` package is meant to sit between `mixr_client` (API hooks) and `mixr` (UI), matching the architecture of `whisperly_lib` which has 6 manager hooks.
- Currently, the `mixr` app bypasses `mixr_lib` entirely and imports hooks directly from `mixr_client` or defines its own hooks in `src/hooks/`.
- Manager hooks should be added for: recipe management (with store sync), user preferences, equipment/ingredient selection state, and favorite management.
- Without this layer, the `mixr` app duplicates state management logic that should be centralized in the lib.

### 3. Add Zustand Stores for Application State
- Unlike `whisperly_lib` which has 4 Zustand stores (project, dictionary, settings, analytics), `mixr_lib` has zero stores.
- The `mixr_client` package provides a `createRecipeStore` but no equivalent stores exist for user preferences, selected equipment/ingredients, or current mood selection.
- Stores for recipe generation wizard state, user onboarding progress, and selected filters would centralize state management currently scattered across the `mixr` app's components.

## Priority 2 - Medium Impact

### 4. Improve Test Quality Beyond Placeholder Tests
- Test files exist (`__tests__/utils/index.test.ts`, `__tests__/business/index.test.ts`, `__tests__/hooks/index.test.tsx`, `__tests__/types/index.test.ts`) but they only test the placeholder implementations.
- When real business logic is added, these test files need to be updated with meaningful test cases.
- Consider adding test fixtures for common MIXR data shapes (mock recipes, equipment sets, ingredient sets) that can be reused across test files.

### 5. Add JSDoc to All Exports Including Re-exports
- The barrel `src/index.ts` has a good `@packageDocumentation` tag but individual exports lack JSDoc.
- The type re-exports from `@sudobility/mixr_types` (70+ types) are exported without any grouping documentation.
- Utility functions and hooks should have JSDoc with `@example` tags showing intended usage patterns.

### 6. Define Clear Boundaries Between Client and Lib Responsibilities
- The current architecture diagram shows `mixr_lib` between `mixr_client` and `mixr`, but the lib only re-exports types and provides placeholder utilities.
- Document what logic belongs in `mixr_lib` vs `mixr_client` vs the `mixr` app -- e.g., recipe filtering/sorting logic, preference-based recommendations, and wizard state management belong in `mixr_lib`.
- Without clear boundaries, developers will continue placing business logic in the app layer.

## Priority 3 - Nice to Have

### 7. Add Recipe Utility Functions
- Common recipe operations (format ingredients list, calculate total prep time, group steps by phase, format rating display) are likely duplicated across UI components in the `mixr` app.
- Centralizing these as pure utility functions in `mixr_lib` would enable reuse across web and potential future React Native app.

### 8. Add Configuration/Constants Module
- MIXR-specific constants (minimum star rating, maximum review length, default pagination limit, supported subcategories) are likely hardcoded in both `mixr` and `mixr_api`.
- A shared constants module in `mixr_lib` would be the canonical source for these values, reducing drift between client and server.
