/**
 For the given input array, filter all elements that start with mang or end with fy
 let items = ['mangalore', 'semangin', '2 lonely', 'verify', 'rectify', 'mangala', 'notifyy']

 */
import assert from "assert";

let items = [
  "mangalore",
  "semangin",
  "2 lonely",
  "verify",
  "rectify",
  "mangalafy",
  "notifyy",
];

const filteredString = items.filter((item) => /^(mang.*|.*fy)$/.test(item));

const expected = ["mangalore", "verify", "rectify", "mangalafy"];

assert.deepStrictEqual(
  filteredString,
  expected,
  "Failed in filtering strings that start with 'mang' or end with 'fy'",
);
