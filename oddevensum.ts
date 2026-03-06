/**
 Generate an array that contains first n natural numbers.  Then get us an object, that contains two keys, ‘odd’, and ‘even’.  Each of these keys will have values as  arrays of odd numbers and even numbers respectively.  How do you transform this result such that keys remain same, but values will be sums of odd numbers and even numbers?
 */

import assert from "assert";

function generateNumbers(n: number) {
  const numbers: number[] = [];

  for (let i = 1; i <= n; i++) {
    numbers.push(i);
  }

  return numbers;
}

function groupOddEven(arr: number[]) {
  const oddNumbers = arr.filter((num) => {
    return num % 2 !== 0;
  });

  const evenNumbers = arr.filter((num) => {
    return num % 2 === 0;
  });

  return {
    odd: oddNumbers,
    even: evenNumbers,
  };
}

function sumOfEvenOdd(object: Record<string, number[]>) {
  const oddr = object.odd.reduce((acc, num) => {
    return acc + num;
  }, 0);

  const evenr = object.even.reduce((acc, num) => {
    return acc + num;
  }, 0);

  return {
    odd: oddr,
    even: evenr,
  };
}

assert.deepStrictEqual(
  generateNumbers(5),
  [1, 2, 3, 4, 5],
  "failed to generate the numbers",
);

assert.deepStrictEqual(
  groupOddEven(generateNumbers(5)),
  { odd: [1, 3, 5], even: [2, 4] },
  "grouping failed",
);

assert.deepStrictEqual(
  sumOfEvenOdd(groupOddEven(generateNumbers(5))),
  {
    odd: 9,
    even: 6,
  },
  "failed  summig up of the array ele of an object",
);
