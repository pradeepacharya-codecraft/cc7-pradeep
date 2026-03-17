/**
 We have this array
 const strings = ["CraftCode is a nice company", "We love CraftCode", "We are working in CraftCode", "Where is CraftCode?"];
 We want to transform the above array such that in each item, we re arrange ‘CraftCode’ with ‘CodeCraft’.

 So, we need to get the transformed array like so:
 ["CodeCraft is a nice company", "We love CodeCraft", 
 "We are working in CodeCraft", "Where is CraftCode?"]
 */

import assert from 'assert';

const strings1 = [
  'CraftCode is a nice company',
  'We love CraftCode',
  'We are working in CraftCode',
  'Where is CraftCode?'
];

const correctedStrings = strings1.map((str) => str.replaceAll('CraftCode', 'CodeCraft'));

const expectedOutput = [
  'CodeCraft is a nice company',
  'We love CodeCraft',
  'We are working in CodeCraft',
  'Where is CodeCraft?'
];

assert.deepStrictEqual(
  correctedStrings,
  expectedOutput,
  'test case related to codecraft is failed'
);
