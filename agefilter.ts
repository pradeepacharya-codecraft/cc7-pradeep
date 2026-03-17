/**
 * filetring out age values form an collection of object
 * returning  a list of ages from the the collection of objects
 */

import assert from 'assert';

const people = [
  {
    name: 'John',
    age: 13
  },
  {
    name: 'Mark',
    age: 56
  },
  {
    name: 'Rachel',
    age: 45
  },
  {
    name: 'Nate',
    age: 67
  },
  {
    name: 'Jeniffer',
    age: 65
  }
];
// From the above list,  get the list of ages.

const filterAge = people.map((object) => object.age);
assert.deepStrictEqual(
  filterAge,
  [13, 56, 45, 67, 65],
  'filtering of ages form the set of object didnot work as expected '
);
