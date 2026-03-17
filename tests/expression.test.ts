/**
 * @description Unit tests for expression evaluation using Stack.
 */

import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../evaluation';

describe('evaluateExpression', () => {
  it('evaluates basic arithmetic', () => {
    expect(evaluateExpression('2 + 3')).toBe(5);
    expect(evaluateExpression('10 - 4')).toBe(6);
    expect(evaluateExpression('3 * 4')).toBe(12);
    expect(evaluateExpression('12 / 3')).toBe(4);
  });

  it('respects operator precedence', () => {
    expect(evaluateExpression('2 + 3 * 4')).toBe(14);
    expect(evaluateExpression('10 - 6 / 2')).toBe(7);
  });

  it('handles parentheses correctly', () => {
    expect(evaluateExpression('5 * ( 6 + 2 ) - 12 / 4')).toBe(37);
    expect(evaluateExpression('( 2 + 3 ) * 4')).toBe(20);
  });

  it('handles multiple parentheses', () => {
    expect(evaluateExpression('( 1 + 2 ) * ( 3 + 4 )')).toBe(21);
  });

  it('handles single number input', () => {
    expect(evaluateExpression('42')).toBe(42);
  });

  it('handles negative numbers', () => {
    expect(evaluateExpression('-5 + 3')).toBe(-2);
  });

  it('handles decimal numbers', () => {
    expect(evaluateExpression('3.5 + 2.5')).toBe(6);
  });

  it('returns undefined for invalid token', () => {
    expect(evaluateExpression('a * 3')).toBeUndefined();
  });

  it('returns undefined for division by zero', () => {
    expect(evaluateExpression('10 / 0')).toBeUndefined();
  });

  it('throws error for empty string', () => {
    expect(() => evaluateExpression('')).toThrow();
  });
});
