/**
 * Business logic for @sudobility/mixr_lib
 *
 * This module provides core initialization and version information
 * for the MIXR library.
 */

import { MixrClient } from '@sudobility/mixr_client';

/**
 * Internal state tracking whether the library has been initialized.
 */
let _initialized = false;

/**
 * Reference to the MixrClient instance provided during initialization.
 */
let _client: MixrClient | null = null;

/**
 * Initializes the MIXR library with a configured {@link MixrClient} instance.
 *
 * This must be called once at application startup before using any library
 * hooks or functions that depend on the client. Calling it multiple times
 * will re-initialize with the new client and log a warning.
 *
 * @param client - A configured MixrClient instance for API communication.
 * @throws {Error} If `client` is null or undefined.
 *
 * @example
 * ```ts
 * import { initializeMixrLib } from '@sudobility/mixr_lib';
 * import { MixrClient } from '@sudobility/mixr_client';
 *
 * const client = new MixrClient({ baseUrl: '/api', networkClient });
 * initializeMixrLib(client);
 * ```
 */
export function initializeMixrLib(client: MixrClient): void {
  if (!client) {
    throw new Error('initializeMixrLib requires a valid MixrClient instance.');
  }

  if (_initialized) {
    console.warn(
      'MIXR Library is being re-initialized. Previous client will be replaced.'
    );
  }

  _client = client;
  _initialized = true;
}

/**
 * Returns whether the MIXR library has been initialized.
 *
 * @returns `true` if {@link initializeMixrLib} has been called successfully.
 *
 * @example
 * ```ts
 * if (!isMixrLibInitialized()) {
 *   initializeMixrLib(client);
 * }
 * ```
 */
export function isMixrLibInitialized(): boolean {
  return _initialized;
}

/**
 * Returns the MixrClient instance provided during initialization.
 *
 * @returns The MixrClient instance, or `null` if not yet initialized.
 *
 * @example
 * ```ts
 * const client = getMixrClient();
 * if (client) {
 *   const moods = await client.getMoods();
 * }
 * ```
 */
export function getMixrClient(): MixrClient | null {
  return _client;
}

/**
 * Resets the library's internal state. Intended for testing purposes only.
 *
 * @internal
 */
export function _resetMixrLib(): void {
  _initialized = false;
  _client = null;
}

/**
 * Current version of the @sudobility/mixr_lib package.
 *
 * This is kept in sync with the version in `package.json`.
 */
export const MIXR_LIB_VERSION = '0.0.14';
