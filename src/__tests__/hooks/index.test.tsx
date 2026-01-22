import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMixrLibPlaceholder } from '../../hooks';

describe('useMixrLibPlaceholder', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should initialize with the provided value', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder('initial'));

    expect(result.current.value).toBe('initial');
  });

  it('should return setValue function', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder('test'));

    expect(typeof result.current.setValue).toBe('function');
  });

  it('should update value when setValue is called', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder('initial'));

    act(() => {
      result.current.setValue('updated');
    });

    expect(result.current.value).toBe('updated');
  });

  it('should log initialization message on mount', () => {
    renderHook(() => useMixrLibPlaceholder('test value'));

    expect(consoleSpy).toHaveBeenCalledWith(
      'MIXR Lib hook initialized with value:',
      'test value'
    );
  });

  it('should log when value changes', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder('initial'));

    // Clear the initial log
    consoleSpy.mockClear();

    act(() => {
      result.current.setValue('new value');
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'MIXR Lib hook initialized with value:',
      'new value'
    );
  });

  it('should handle empty string as initial value', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder(''));

    expect(result.current.value).toBe('');
  });

  it('should handle special characters', () => {
    const { result } = renderHook(() => useMixrLibPlaceholder('café ☕'));

    expect(result.current.value).toBe('café ☕');
  });

  it('should maintain state across re-renders', () => {
    const { result, rerender } = renderHook(() => useMixrLibPlaceholder('test'));

    expect(result.current.value).toBe('test');

    rerender();

    expect(result.current.value).toBe('test');
  });
});
