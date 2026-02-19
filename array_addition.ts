import assert from "assert";

/**

 * Adds two arrays element-wise using their corresponding indices.
 * @param a An array of numbers.
 * @param b An array of numbers.
 * @returns The element-wise sum of the two arrays.
 */

function addArrays(a: number[], b: number[]): number[] {
  let res: number[] = [];
  let maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    let valueA = a[i] ?? 0;
    let valueB = b[i] ?? 0;

    res.push(valueA + valueB);
  }

  return res;
}

let array1 = [1, 2, 3];
let array2 = [1, 2, 3];

// 1
assert.deepStrictEqual(
  addArrays(array1, array2),
  [2, 4, 6],
  `Expected [2, 4, 6] but received ${addArrays(array1, array2)}.`,
);

// 2
assert.deepStrictEqual(
  addArrays([1, 2, 3, 4], [10, 20]),
  [11, 22, 3, 4],
  `Expected [11, 22, 3, 4] but received ${addArrays([1, 2, 3, 4], [10, 20])}.`,
);

// 3
assert.deepStrictEqual(
  addArrays([1, 2], [10, 20, 30, 40]),
  [11, 22, 30, 40],
  `Expected [11, 22, 30, 40] but received ${addArrays([1, 2], [10, 20, 30, 40])}.`,
);

// 4
assert.deepStrictEqual(
  addArrays([], [5, 6]),
  [5, 6],
  `Expected [5, 6] but received ${addArrays([], [5, 6])}.`,
);
