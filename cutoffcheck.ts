// Write a Higher Order function(HOF):
// function createCutOff(cutOffValue)
// This function should return, another function which takes a number as its argument and should return if the number is within cutoff value that it closes over its containing function.
// We should be able to say:
// const cutOff100 = createCutOff(100)
// assert.equal(cutOff100(89), true)
// assert.equal(cutOff100(189), false)

/**checking a values comes within cutoff
 * @param cutoffValue :this value is the upper limit of the cutoff
 * @returns return true if the given value is comes under the cutoff else false
 */

import assert from 'assert';

function createCutOff(cutoffValue: number): (value: number) => boolean {
  return (value: number): boolean => {
    return value <= cutoffValue;
  };
}

const cutOff100 = createCutOff(100);

assert.strictEqual(cutOff100(89), true, 'the vaue 89 is not in the cutoff range');
assert.strictEqual(cutOff100(189), false, 'the value 189 is not in the cutoff range');
assert.strictEqual(cutOff100(100), true, 'the value 100 is not in the cutoff range');
