import assert from "assert";

/**
 * Boundary hearts are 💚 and inner hearts are 💙
 * @param n represent number of lines
 * @returns string
 */

function boundedHeartPattern(n: number): string {
  if (n < 0) {
    return "Value of 'n' cannot be negative";
  }

  let result = "";

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (j === 1 || j === i || i === n) {
        result += "💚";
      } else {
        result += "💙";
      }

      if (j < i) {
        result += " ";
      }
    }

    if (i < n) {
      result += "\n";
    }
  }

  return result;
}

const n1 = 1;
const n2 = 2;
const n3 = 3;
const n4 = 5;
const n5 = -1;

assert(
  boundedHeartPattern(n1) === "💚",
  `Expected "💚" but received "${boundedHeartPattern(n1)}".`,
);

assert(
  boundedHeartPattern(n2) === "💚\n💚 💚",
  `Expected "💚\\n💚 💚" but received "${boundedHeartPattern(n2)}".`,
);

assert(
  boundedHeartPattern(n3) === "💚\n💚 💚\n💚 💚 💚",
  `Expected "💚\\n💚 💚\\n💚 💚 💚" but received "${boundedHeartPattern(n3)}".`,
);

assert(
  boundedHeartPattern(n4) ===
    "💚\n💚 💚\n💚 💙 💚\n💚 💙 💙 💚\n💚 💚 💚 💚 💚",
  `Expected "💚\\n💚 💚\\n💚 💙 💚\\n💚 💙 💙 💚\\n💚 💚 💚 💚 💚" but received "${boundedHeartPattern(n4)}".`,
);

assert(
  boundedHeartPattern(n5) === "Value of 'n' cannot be negative",
  `Expected "Value of 'n' cannot be negative" but received "${boundedHeartPattern(n5)}".`,
);
