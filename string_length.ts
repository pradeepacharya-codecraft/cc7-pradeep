import assert from "assert";

/**
 * Computes the length of a string without using the built-in .length property
 * @param str input string
 * @returns number of characters in the string
 */
function lengthOfString(str: string): number {
  let count = 0;

  while (str[count] !== undefined) {
    count++;
  }

  return count;
}

// 1
assert.strictEqual(
  lengthOfString("hlwlo"),
  5,
  `Expected 5 but received ${lengthOfString("hlwlo")}.`,
);

// 2
assert.strictEqual(
  lengthOfString(""),
  0,
  `Expected 0 but received ${lengthOfString("")}.`,
);

// 3
assert.strictEqual(
  lengthOfString("12345"),
  5,
  `Expected 5 but received ${lengthOfString("12345")}.`,
);

// 4
assert.strictEqual(
  lengthOfString(" "),
  1,
  `Expected 1 but received ${lengthOfString(" ")}.`,
);
