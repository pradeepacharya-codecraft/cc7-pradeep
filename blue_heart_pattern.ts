import assert from "assert";

/**
 * Returns blue heart pattern string for the given number
 * @param n number
 * @returns string
 */

function blueHeartPattern(n: number): string {
  if (n < 0) {
    return "Value of 'n' cannot be negative";
  }

  let result = "";

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      result += "💙";

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

let n1 = 0;
let n2 = 2;
let n3 = -1;
let n4 = 4;
let n5 = 5;

assert(
  blueHeartPattern(n1) === "",
  `Test failed for input ${n1}. Expected: "" | Received: "${blueHeartPattern(n1)}"`,
);

assert(
  blueHeartPattern(n2) === "💙\n💙 💙",
  `Test failed for input ${n2}. Expected: "💙\\n💙 💙" | Received: "${blueHeartPattern(n2)}"`,
);

assert(
  blueHeartPattern(n3) === "Value of 'n' cannot be negative",
  `Test failed for input ${n3}. Expected: "Value of 'n' cannot be negative" | Received: "${blueHeartPattern(n3)}"`,
);

assert(
  blueHeartPattern(n4) === "💙\n💙 💙\n💙 💙 💙\n💙 💙 💙 💙",
  `Test failed for input ${n4}. Expected: "💙\\n💙 💙\\n💙 💙 💙\\n💙 💙 💙 💙" | Received: "${blueHeartPattern(n4)}"`,
);

assert(
  blueHeartPattern(n5) === "💙\n💙 💙\n💙 💙 💙\n💙 💙 💙 💙\n💙 💙 💙 💙 💙",
  `Test failed for input ${n5}. Expected: "💙\\n💙 💙\\n💙 💙 💙\\n💙 💙 💙 💙\\n💙 💙 💙 💙 💙" | Received: "${blueHeartPattern(n5)}"`,
);
