import assert from "assert";

/**
 * Returns substring until a repeating character is found
 * @param str input string
 * @returns string
 */

function getStringSpecial(str: string): string {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];
    let alreadyExists = false;

    for (let j = 0; j < result.length; j++) {
      if (result[j] === currentChar) {
        alreadyExists = true;
        break;
      }
    }

    if (alreadyExists) {
      break;
    }

    result += currentChar;
  }

  return result;
}

const s1 = "a dream that is";
const s2 = "unparliamentary";
const s3 = "abcabc";
const s4 = "";

assert(
  getStringSpecial(s1) === "a dre",
  `Expected "a dre" but received "${getStringSpecial(s1)}".`,
);

assert(
  getStringSpecial(s2) === "unparli",
  `Expected "unparli" but received "${getStringSpecial(s2)}".`,
);

assert(
  getStringSpecial(s3) === "abc",
  `Expected "abc" but received "${getStringSpecial(s3)}".`,
);

assert(
  getStringSpecial(s4) === "",
  `Expected "" but received "${getStringSpecial(s4)}".`,
);
