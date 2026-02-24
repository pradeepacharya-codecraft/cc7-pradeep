import assert from "assert";

/**
 * pads zeros before a number to match required digits
 * @param number original number
 * @param numOfDigits total required digits
 * @returns string
 */

function padZerosBeforeNumber(number: number, numOfDigits: number): string {
  if (numOfDigits < 0) {
    return "Number of digits cannot be negative";
  }

  let numStr = number.toString();

  if (numStr.length >= numOfDigits) {
    return numStr;
  }

  let zerosNeeded = numOfDigits - numStr.length;
  let result = "";

  for (let i = 0; i < zerosNeeded; i++) {
    result += "0";
  }

  result += numStr;

  return result;
}

let n1 = 233;
let n2 = 45;
let n3 = 12345;
let n4 = 5;
let n5 = -1;

assert(
  padZerosBeforeNumber(n1, 6) === "000233",
  `Expected "000233" but received "${padZerosBeforeNumber(n1, 6)}".`,
);

assert(
  padZerosBeforeNumber(n2, 4) === "0045",
  `Expected "0045" but received "${padZerosBeforeNumber(n2, 4)}".`,
);

assert(
  padZerosBeforeNumber(n3, 3) === "12345",
  `Expected "12345" but received "${padZerosBeforeNumber(n3, 3)}".`,
);

assert(
  padZerosBeforeNumber(n4, 1) === "5",
  `Expected "5" but received "${padZerosBeforeNumber(n4, 1)}".`,
);

assert(
  padZerosBeforeNumber(n4, n5) === "Number of digits cannot be negative",
  `Expected "Number of digits cannot be negative" but received "${padZerosBeforeNumber(n4, n5)}".`,
);
