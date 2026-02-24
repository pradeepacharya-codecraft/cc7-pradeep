import assert from "assert";

/**
 * Computes the square of each number up to the specified length.
 * @param n number of perfect squares to generate.
 * @returns the first n perfect squares.
 
 */

function generateFirstSquares(n: number): number[] {
  let res: number[] = [];
  for (let i = 1; i <= n; i++) {
    res.push(i * i);
  }
  return res;
}
assert.deepStrictEqual(
  generateFirstSquares(4),
  [1, 4, 9, 16],
  `Expected [1, 4, 9, 16] but received ${generateFirstSquares(4)}.`,
);

assert.deepStrictEqual(
  generateFirstSquares(0),
  [],
  `Expected [] but received ${generateFirstSquares(0)}.`,
);

assert.deepStrictEqual(
  generateFirstSquares(2),
  [1, 4],
  `Expected [1, 4] but received ${generateFirstSquares(2)}.`,
);
