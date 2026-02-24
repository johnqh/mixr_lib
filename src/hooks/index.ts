/**
 * React hooks for @sudobility/mixr_lib
 *
 * This module provides custom React hooks that integrate with MIXR functionality.
 * Hooks will be added as features are implemented.
 */

import { useEffect, useState } from 'react';

/**
 * A simple stateful hook that wraps a string value with optional
 * logging on value changes.
 *
 * This is a placeholder hook demonstrating the hook pattern used in this
 * library. It will be replaced or augmented with domain-specific hooks
 * (e.g., recipe management, preference selection) as the library matures.
 *
 * @param initialValue - The initial string value for the hook state.
 * @returns An object with the current `value` and a `setValue` setter.
 *
 * @example
 * ```tsx
 * function SearchBar() {
 *   const { value, setValue } = useMixrLibPlaceholder('');
 *   return <input value={value} onChange={e => setValue(e.target.value)} />;
 * }
 * ```
 */
export function useMixrLibPlaceholder(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    console.log('MIXR Lib hook initialized with value:', value);
  }, [value]);

  return {
    value,
    setValue,
  };
}
