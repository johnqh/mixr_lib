import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initializeMixrLib, MIXR_LIB_VERSION } from '../../business';
import type { MixrClient } from '@sudobility/mixr_client';

describe('MIXR_LIB_VERSION', () => {
  it('should be defined', () => {
    expect(MIXR_LIB_VERSION).toBeDefined();
  });

  it('should be a string', () => {
    expect(typeof MIXR_LIB_VERSION).toBe('string');
  });

  it('should follow semver format', () => {
    // Basic semver check: major.minor.patch
    const semverRegex = /^\d+\.\d+\.\d+$/;
    expect(MIXR_LIB_VERSION).toMatch(semverRegex);
  });
});

describe('initializeMixrLib', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should log initialization message', () => {
    const mockClient = {
      getVersion: vi.fn(),
      healthCheck: vi.fn(),
    } as unknown as MixrClient;

    initializeMixrLib(mockClient);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      'MIXR Library initialized with client:',
      mockClient
    );
  });

  it('should accept any MixrClient instance', () => {
    const mockClient = {} as MixrClient;

    // Should not throw
    expect(() => initializeMixrLib(mockClient)).not.toThrow();
  });
});
