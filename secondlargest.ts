//  Find the second largest number in a given array first by using an imperative approach without using reduce. Use a forEach HOF to iterate over items and figure out the second largest item.
//  Also give a solution using reduce method.

import assert from 'assert';

/**
 * imperative approach  and forEach method to find second largest element of array .
 * @param arr is an  array of element
 * @returns number or null
 */

function findSecondLargest(arr: number[]): number | null {
  if (arr.length < 2) {
    return null;
  }

  let largest = -Infinity;
  let secondLargest = -Infinity;

  arr.forEach((num) => {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  });

  return secondLargest;
}

const array = [12, 3, 4, 11, 5, 6];

assert.deepStrictEqual(findSecondLargest(array), 11);

/**
 * using reduce method to find the second large array element
 */

const scndLargReduce = array.reduce(
  (acc, current) => {
    if (current > acc.large) {
      acc.secondLarge = acc.large;
      acc.large = current;
    } else if (current > acc.secondLarge && acc.large !== current) {
      acc.secondLarge = current;
    }
    return acc;
  },
  { large: -Infinity, secondLarge: -Infinity }
);

assert.deepStrictEqual(scndLargReduce.secondLarge, 11);
