import { describe, it, expect } from 'vitest';
import {
  EQUIPMENT_SUBCATEGORIES,
  INGREDIENT_SUBCATEGORIES,
} from '../../types';

describe('EQUIPMENT_SUBCATEGORIES', () => {
  it('should be defined', () => {
    expect(EQUIPMENT_SUBCATEGORIES).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(EQUIPMENT_SUBCATEGORIES)).toBe(true);
  });

  it('should contain expected subcategories', () => {
    expect(EQUIPMENT_SUBCATEGORIES).toContain('essential');
    expect(EQUIPMENT_SUBCATEGORIES).toContain('glassware');
    expect(EQUIPMENT_SUBCATEGORIES).toContain('garnish');
    expect(EQUIPMENT_SUBCATEGORIES).toContain('advanced');
  });

  it('should have exactly 4 subcategories', () => {
    expect(EQUIPMENT_SUBCATEGORIES).toHaveLength(4);
  });
});

describe('INGREDIENT_SUBCATEGORIES', () => {
  it('should be defined', () => {
    expect(INGREDIENT_SUBCATEGORIES).toBeDefined();
  });

  it('should be an array', () => {
    expect(Array.isArray(INGREDIENT_SUBCATEGORIES)).toBe(true);
  });

  it('should contain expected subcategories', () => {
    expect(INGREDIENT_SUBCATEGORIES).toContain('spirit');
    expect(INGREDIENT_SUBCATEGORIES).toContain('wine');
    expect(INGREDIENT_SUBCATEGORIES).toContain('other_alcohol');
    expect(INGREDIENT_SUBCATEGORIES).toContain('fruit');
    expect(INGREDIENT_SUBCATEGORIES).toContain('spice');
    expect(INGREDIENT_SUBCATEGORIES).toContain('other');
  });

  it('should have exactly 6 subcategories', () => {
    expect(INGREDIENT_SUBCATEGORIES).toHaveLength(6);
  });
});
