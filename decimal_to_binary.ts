import assert from "assert";

/**
 * Converts decimal number to binary string
 * @param numInDecimal decimal number
 * @returns string
 */

function convertToBinary(numInDecimal: number): string {
  if (numInDecimal < 0) {
    return "Number cannot be negative";
  }

  if (numInDecimal === 0) {
    return "0";
  }

  let result = "";
  let number = numInDecimal;

  while (number > 0) {
    const remainder = number % 2;
    result = remainder + result;
    number = Math.floor(number / 2);
  }

  return result;
}

const n1 = 10;
const n2 = 1000;
const n3 = 0;
const n4 = -5;

assert(
  convertToBinary(n1) === "1010",
  `Expected "1010" but received "${convertToBinary(n1)}".`,
);

assert(
  convertToBinary(n2) === "1111101000",
  `Expected "1111101000" but received "${convertToBinary(n2)}".`,
);

assert(
  convertToBinary(n3) === "0",
  `Expected "0" but received "${convertToBinary(n3)}".`,
);

assert(
  convertToBinary(n4) === "Number cannot be negative",
  `Expected "Number cannot be negative" but received "${convertToBinary(n4)}".`,
);
