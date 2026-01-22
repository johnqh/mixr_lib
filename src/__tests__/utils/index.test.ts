import { describe, it, expect } from 'vitest';
import { formatMixrData, validateMixrInput } from '../../utils';

describe('formatMixrData', () => {
  it('should format an object as pretty-printed JSON', () => {
    const data = { name: 'Mojito', ingredients: ['rum', 'mint', 'lime'] };
    const result = formatMixrData(data);

    expect(result).toBe(JSON.stringify(data, null, 2));
    expect(result).toContain('"name": "Mojito"');
    expect(result).toContain('"ingredients"');
  });

  it('should format a simple string', () => {
    const data = 'hello';
    const result = formatMixrData(data);

    expect(result).toBe('"hello"');
  });

  it('should format a number', () => {
    const data = 42;
    const result = formatMixrData(data);

    expect(result).toBe('42');
  });

  it('should format null', () => {
    const result = formatMixrData(null);

    expect(result).toBe('null');
  });

  it('should format an array', () => {
    const data = [1, 2, 3];
    const result = formatMixrData(data);

    expect(result).toBe(JSON.stringify(data, null, 2));
  });

  it('should format nested objects', () => {
    const data = {
      recipe: {
        name: 'Margarita',
        mood: {
          id: 1,
          name: 'Celebratory',
        },
      },
    };
    const result = formatMixrData(data);

    expect(result).toContain('"recipe"');
    expect(result).toContain('"mood"');
    expect(result).toContain('"Margarita"');
  });
});

describe('validateMixrInput', () => {
  it('should return true for non-empty strings', () => {
    expect(validateMixrInput('hello')).toBe(true);
    expect(validateMixrInput('a')).toBe(true);
    expect(validateMixrInput('test input')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(validateMixrInput('')).toBe(false);
  });

  it('should return true for strings with only whitespace', () => {
    // Current implementation only checks length > 0
    expect(validateMixrInput(' ')).toBe(true);
    expect(validateMixrInput('   ')).toBe(true);
  });

  it('should return true for strings with special characters', () => {
    expect(validateMixrInput('!@#$%')).toBe(true);
    expect(validateMixrInput('café')).toBe(true);
  });
});
