import assert from "assert";

/**
 * Creates a new array by applying a transform function to each element
 * of the input array. This implementation uses `reduce` internally
 * instead of the built-in `map` method.
 */
const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc: U[], item: T) => {
    const transformedValue = transform(item);
    acc.push(transformedValue);

    return acc;
  }, []);
};

/**
 * Creates a new array containing only the elements that satisfy
 * the provided predicate function. This implementation uses
 * `reduce` internally instead of the built-in `filter` method.
 */
const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc: T[], item: T) => {
    if (predicate(item)) {
      acc.push(item);
    }

    return acc;
  }, []);
};

const numbers = [1, 2, 3, 4];

assert.deepStrictEqual(
  map(numbers, (n) => n * n),
  [1, 4, 9, 16],
  "failed map function",
);

assert.deepStrictEqual(
  filter(numbers, (n) => n % 2 === 0),
  [2, 4],
  "failed filter function",
);
