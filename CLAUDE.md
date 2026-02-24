# MIXR Lib

Business logic library for MIXR with shared utilities, types, and hooks.

**npm**: `@sudobility/mixr_lib` (restricted)

## Tech Stack

- **Language**: TypeScript
- **Runtime**: Bun
- **Package Manager**: Bun (do not use npm/yarn/pnpm for installing dependencies)
- **Build**: TypeScript compiler (tsc)
- **Test**: Vitest + React Testing Library + happy-dom

## Project Structure

```
src/
├── index.ts              # Public exports
├── business/
│   └── index.ts          # initializeMixrLib, MIXR_LIB_VERSION
├── hooks/
│   └── index.ts          # React hooks
├── types/
│   └── index.ts          # Re-exports from mixr_types
├── utils/
│   └── index.ts          # Utility functions
└── __tests__/
    ├── business/
    ├── hooks/
    ├── types/
    └── utils/
```

## Commands

```bash
bun run build        # Build to dist/
bun run build:watch  # Watch mode build
bun run clean        # Remove dist/
bun run test         # Run Vitest
bun run lint         # Run ESLint
bun run typecheck    # TypeScript check
bun run format       # Format with Prettier
bun run verify       # Run typecheck + lint + test + build
```

## Exports

### Business Logic
- `initializeMixrLib(client: MixrClient)` - Initialize the library with a client instance
- `isMixrLibInitialized()` - Check if the library has been initialized
- `getMixrClient()` - Get the stored MixrClient instance
- `MIXR_LIB_VERSION` - Current version string

### Types (re-exported from mixr_types)
All entity types, request/response types, and constants from `@sudobility/mixr_types`.

### Utilities
- `formatMixrData(data)` - JSON pretty-printer (handles circular references)
- `validateMixrInput(input)` - Basic non-empty string validation (trims whitespace)
- `validateDisplayName(name)` - Display name length validation
- `validateStarRating(stars)` - Star rating range validation (1-5, integer)
- `validateReviewText(review)` - Review text length validation

### Recipe Helpers
- `formatIngredientList(ingredients)` - Format ingredients with amounts as readable strings
- `formatRecipeSteps(steps)` - Number recipe steps (e.g., "1. Muddle mint...")
- `formatRatingDisplay(aggregate)` - Format rating aggregate as display string
- `getIngredientCount(recipe)` - Count ingredients in a recipe
- `getStepCount(recipe)` - Count steps in a recipe
- `getEquipmentNames(recipe)` - Extract unique equipment names from a recipe

### Constants
- `MIN_STAR_RATING`, `MAX_STAR_RATING` - Star rating range (1-5)
- `MAX_REVIEW_LENGTH` - Maximum review text length (2000)
- `MIN_DISPLAY_NAME_LENGTH`, `MAX_DISPLAY_NAME_LENGTH` - Display name constraints (3-50)
- `DEFAULT_PAGE_LIMIT`, `MAX_PAGE_LIMIT` - Pagination defaults (20, 100)
- `DEFAULT_RATING_SORT` - Default rating sort order ("newest")

### Hooks
- `useMixrLibPlaceholder(initialValue)` - Example hook pattern

## Usage

```typescript
import {
  initializeMixrLib,
  formatMixrData,
  validateMixrInput,
  MIXR_LIB_VERSION,
} from '@sudobility/mixr_lib';

import type { Equipment, Recipe, Mood } from '@sudobility/mixr_lib';
```

## Peer Dependencies

- `@sudobility/di` >= 1.5.36
- `@sudobility/mixr_types` >= 0.0.8
- `@tanstack/react-query` >= 5.0.0
- `react` >= 18.0.0
- `zustand` >= 5.0.0

## Architecture

This library sits between the client (API hooks) and the app (UI):

```
mixr (frontend)
    └── mixr_lib (this package - business logic, types, utils)
        └── mixr_client (API hooks)
            └── mixr_types (types)
```

## Publishing

```bash
bun run prepublishOnly  # Clean + build
npm publish             # Publish to npm
```
