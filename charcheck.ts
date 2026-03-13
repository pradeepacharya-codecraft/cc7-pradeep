/**
 In the array given below, filter out all strings that contain  either ‘u’ or ‘g’.
 const items = ['browl', 'faaast', 'energy', 'stand', 'eat', 'lunch']

 */
import assert from "assert";
const items = ["browl", "faaast", "energy", "stand", "eat", "lunch"];

const filterOut = items.filter((item) => /[u,g]/.test(item));

const expected = ["energy", "lunch"];
assert.deepStrictEqual(
  filterOut,
  expected,
  "checking for u and g character containg  string is failed",
);
