/**
 *For the given array of indices, we need to return an array  containing fibonacci numbers at those indices
 For example:
 [2, 1, 5,  7] should be transformed into [1, 1, 5, 13]
 Fibonacci series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

 */

import assert from "assert";

//returns the fibnocci value

function fib(num: number) {
  if (num == 0) {
    return 0;
  }
  if (num == 1) {
    return 1;
  }
  let prev = 0;
  let cur = 1;
  for (let i = 2; i <= num; i++) {
    let next = prev + cur;
    prev = cur;
    cur = next;
  }
  return cur;
}

let list = [2, 1, 5, 7];

let fibIndex = list.map((index) => fib(index));

assert.deepStrictEqual(
  fibIndex,
  [1, 1, 5, 13],
  "fibnocii function and filtering didnot work as expected",
);
