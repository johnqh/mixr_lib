# @sudobility/mixr_lib

Shared utilities and business logic library for the MIXR cocktail application. This library provides common functionality, React hooks, and type-safe patterns for building MIXR-based applications.

## Installation

```bash
npm install @sudobility/mixr_lib
```

## Peer Dependencies

This library requires the following peer dependencies:

- `@sudobility/types` - Core type definitions
- `@sudobility/di` - Dependency injection framework
- `@sudobility/mixr_client` - MIXR API client
- `@tanstack/react-query` - Data fetching and caching
- `react` - React framework

```bash
npm install @sudobility/types @sudobility/di @sudobility/mixr_client @tanstack/react-query react
```

## Features

- **Business Logic**: Core business operations and workflows
- **React Hooks**: Custom hooks for MIXR functionality integration
- **Utilities**: Helper functions and common utilities
- **Type Definitions**: Shared TypeScript types and interfaces
- **Type Safety**: Built with strict TypeScript for maximum type safety

## Usage

```typescript
import {
  initializeMixrLib,
  formatMixrData,
  useMixrLibPlaceholder,
  MIXR_LIB_VERSION,
} from '@sudobility/mixr_lib';

// Initialize the library
const client = new MixrClient(/* ... */);
initializeMixrLib(client);

// Use utilities
const formattedData = formatMixrData(data);

// Use hooks in React components
function MyComponent() {
  const { value, setValue } = useMixrLibPlaceholder('initial');
  // ...
}
```

## Project Structure

```
src/
├── business/     # Core business logic and operations
├── hooks/        # React hooks
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
├── test/         # Test setup and utilities
└── index.ts      # Main entry point with barrel exports
```

## Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run dev
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Generate coverage report
npm run test:coverage
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

### Type Checking

```bash
# Check types
npm run typecheck

# Check types in watch mode
npm run typecheck:watch
```

### All Checks

```bash
# Run all checks (lint, typecheck, test)
npm run check-all

# Quick check (lint and typecheck only)
npm run quick-check
```

## TypeScript Configuration

This library uses strict TypeScript configuration with:

- Strict null checks
- No implicit any
- Exact optional property types
- No unchecked indexed access
- And more strict options for maximum type safety

## License

MIT

## Author

John Huang

## Repository

https://github.com/johnqh/mixr_lib.git

## Version

0.0.1 (Initial development version with placeholder code)
