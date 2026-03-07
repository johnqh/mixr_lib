# @sudobility/mixr_lib

Business logic library for the MIXR cocktail platform with shared utilities, validation, and recipe helpers.

## Installation

```bash
bun add @sudobility/mixr_lib
```

### Peer Dependencies

```bash
bun add @sudobility/di @sudobility/mixr_types @tanstack/react-query react zustand
```

## Usage

```typescript
import {
  initializeMixrLib,
  getMixrClient,
  formatMixrData,
  validateMixrInput,
  MIXR_LIB_VERSION,
} from '@sudobility/mixr_lib';

import type { Equipment, Recipe, Mood } from '@sudobility/mixr_lib';

// Initialize with a MixrClient instance
initializeMixrLib(client);
```

## API

### Business Logic

- `initializeMixrLib(client)` -- initialize the library
- `isMixrLibInitialized()` -- check initialization status
- `getMixrClient()` -- get the stored MixrClient instance

### Validation

- `validateMixrInput(input)` -- non-empty string validation
- `validateDisplayName(name)` -- display name length (3-50 chars)
- `validateStarRating(stars)` -- integer range (1-5)
- `validateReviewText(review)` -- review length (max 2000)

### Recipe Helpers

- `formatIngredientList(ingredients)` -- readable ingredient strings
- `formatRecipeSteps(steps)` -- numbered step list
- `formatRatingDisplay(aggregate)` -- rating display string
- `getIngredientCount(recipe)`, `getStepCount(recipe)`, `getEquipmentNames(recipe)`

### Constants

- `MIN_STAR_RATING` / `MAX_STAR_RATING` -- 1-5
- `MAX_REVIEW_LENGTH` -- 2000
- `MIN_DISPLAY_NAME_LENGTH` / `MAX_DISPLAY_NAME_LENGTH` -- 3-50
- `DEFAULT_PAGE_LIMIT` / `MAX_PAGE_LIMIT` -- 20/100

### Types

Re-exports all entity, request, and response types from `@sudobility/mixr_types`.

## Development

```bash
bun run build        # Build to dist/
bun run build:watch  # Watch mode
bun run test         # Run Vitest
bun run typecheck    # TypeScript check
bun run lint         # ESLint check
bun run verify       # Typecheck + lint + test + build
```

## Related Packages

- `@sudobility/mixr_types` -- type definitions
- `@sudobility/mixr_client` -- API client and hooks
- `mixr` -- frontend web app

## License

MIT
