import assert from 'assert';

/**
 * Implement a method called as   some  that takes the array as its first argument, and a predicate as its second argument.  Predicate is a function that takes an item in the array as its argument, and returns a boolean.  some function will return true if at-least one item in the array passes the predicate, otherwise will return false. Give an imperative solution, and then give a solution using reduce.
 */

//Imperative solution.
const items = [10, 20, 30, 40, 50];

function some(items: number[], predicate: (item: number) => boolean): boolean {
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i]!)) {
      return true;
    }
  }
  return false;
}

assert.strictEqual(
  some(items, (x) => x > 35),
  true,
  'predicate function condition item >35  failed for the given input array '
);

//using reduce method.

function some1(items: number[], predicate: (item: number) => boolean): boolean {
  return items.reduce((acc, current) => {
    if (acc || predicate(current)) {
      acc = true;
    }
    return acc;
  }, false);
}

assert.strictEqual(
  some1(items, (x) => x == 50),
  true,
  'predicate function  condition item ==50 failed for the given input array'
);

assert.strictEqual(
  some1(items, (x) => x > 50),
  false,
  'predicate function condition item >50 failed for the given input array'
);
