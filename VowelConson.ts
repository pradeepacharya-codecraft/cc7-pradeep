/**
 Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.
 */

import assert from 'assert';

function generateAlphabets(): string[] {
  const alphabets: string[] = [];

  for (let i = 97; i <= 122; i++) {
    alphabets.push(String.fromCharCode(i));
  }

  return alphabets;
}

function groupVowelsConsonants(arr: string[]) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const vowelArr = arr.filter((char) => vowels.includes(char));
  const consonantArr = arr.filter((char) => !vowels.includes(char));

  return {
    vowels: vowelArr,
    consonants: consonantArr
  };
}

assert.deepStrictEqual(groupVowelsConsonants(generateAlphabets()), {
  vowels: ['a', 'e', 'i', 'o', 'u'],
  consonants: [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z'
  ]
});
