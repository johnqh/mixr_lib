import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  initializeMixrLib,
  isMixrLibInitialized,
  getMixrClient,
  _resetMixrLib,
  MIXR_LIB_VERSION,
} from '../../business';
import type { MixrClient } from '@sudobility/mixr_client';

describe('MIXR_LIB_VERSION', () => {
  it('should be defined', () => {
    expect(MIXR_LIB_VERSION).toBeDefined();
  });

  it('should be a string', () => {
    expect(typeof MIXR_LIB_VERSION).toBe('string');
  });

  it('should follow semver format', () => {
    const semverRegex = /^\d+\.\d+\.\d+$/;
    expect(MIXR_LIB_VERSION).toMatch(semverRegex);
  });
});

describe('initializeMixrLib', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    _resetMixrLib();
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should initialize successfully with a valid client', () => {
    const mockClient = {
      getVersion: vi.fn(),
      healthCheck: vi.fn(),
    } as unknown as MixrClient;

    expect(() => initializeMixrLib(mockClient)).not.toThrow();
    expect(isMixrLibInitialized()).toBe(true);
  });

  it('should store the client reference', () => {
    const mockClient = {
      getVersion: vi.fn(),
    } as unknown as MixrClient;

    initializeMixrLib(mockClient);
    expect(getMixrClient()).toBe(mockClient);
  });

  it('should throw if client is null', () => {
    expect(() =>
      initializeMixrLib(null as unknown as MixrClient)
    ).toThrow('initializeMixrLib requires a valid MixrClient instance.');
  });

  it('should throw if client is undefined', () => {
    expect(() =>
      initializeMixrLib(undefined as unknown as MixrClient)
    ).toThrow('initializeMixrLib requires a valid MixrClient instance.');
  });

  it('should warn when re-initialized', () => {
    const client1 = { id: 1 } as unknown as MixrClient;
    const client2 = { id: 2 } as unknown as MixrClient;

    initializeMixrLib(client1);
    initializeMixrLib(client2);

    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'MIXR Library is being re-initialized. Previous client will be replaced.'
    );
  });

  it('should replace the client on re-initialization', () => {
    const client1 = { id: 1 } as unknown as MixrClient;
    const client2 = { id: 2 } as unknown as MixrClient;

    initializeMixrLib(client1);
    expect(getMixrClient()).toBe(client1);

    initializeMixrLib(client2);
    expect(getMixrClient()).toBe(client2);
  });
});

describe('isMixrLibInitialized', () => {
  beforeEach(() => {
    _resetMixrLib();
  });

  it('should return false before initialization', () => {
    expect(isMixrLibInitialized()).toBe(false);
  });

  it('should return true after initialization', () => {
    const mockClient = {} as MixrClient;
    initializeMixrLib(mockClient);
    expect(isMixrLibInitialized()).toBe(true);
  });
});

describe('getMixrClient', () => {
  beforeEach(() => {
    _resetMixrLib();
  });

  it('should return null before initialization', () => {
    expect(getMixrClient()).toBeNull();
  });

  it('should return the client after initialization', () => {
    const mockClient = { test: true } as unknown as MixrClient;
    initializeMixrLib(mockClient);
    expect(getMixrClient()).toBe(mockClient);
  });
});

describe('_resetMixrLib', () => {
  it('should reset initialized state to false', () => {
    const mockClient = {} as MixrClient;
    initializeMixrLib(mockClient);
    expect(isMixrLibInitialized()).toBe(true);

    _resetMixrLib();
    expect(isMixrLibInitialized()).toBe(false);
  });

  it('should reset client to null', () => {
    const mockClient = {} as MixrClient;
    initializeMixrLib(mockClient);
    expect(getMixrClient()).toBe(mockClient);

    _resetMixrLib();
    expect(getMixrClient()).toBeNull();
  });
});
