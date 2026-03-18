/**
 We want to add 10 to each number in an array of given numbers, and then filter out those that can be divided by 4.
 For example input:
 const numbers = [34, 45, 2, 53, 84, 542, 31, 23].
 we should get
 [44, 12, 552]

 */

import assert from 'assert';

const numbers = [34, 45, 2, 53, 84, 542, 31, 23];

const div4 = numbers
  .map((num) => num + 10)
  .filter((num) => {
    return num % 4 === 0;
  });

assert.deepStrictEqual(div4, [44, 12, 552], "didn't filter correctly ");
