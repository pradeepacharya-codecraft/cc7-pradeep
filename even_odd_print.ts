import assert from "assert";

function printNumbers(n: number, evenOrOdd: string): number[] | string {
  if (n < 0) {
    return "Value of 'n' cannot be negative";
  }

  if (evenOrOdd !== "even" && evenOrOdd !== "odd") {
    return "Second argument must be 'even' or 'odd'";
  }

  let result: number[] = [];
  let number = 1;

  while (result.length < n) {
    if (evenOrOdd === "odd" && number % 2 === 1) {
      result.push(number);
    }

    if (evenOrOdd === "even" && number % 2 === 0) {
      result.push(number);
    }

    number++;
  }

  return result;
}

assert.deepStrictEqual(
  printNumbers(4, "odd"),
  [1, 3, 5, 7],
  `Expected [1, 3, 5, 7] but received ${printNumbers(4, "odd")}.`,
);

assert.deepStrictEqual(
  printNumbers(5, "even"),
  [2, 4, 6, 8, 10],
  `Expected [2, 4, 6, 8, 10] but received ${printNumbers(5, "even")}.`,
);

assert.strictEqual(
  printNumbers(-1, "odd"),
  "Value of 'n' cannot be negative",
  `Expected "Value of 'n' cannot be negative" but received "${printNumbers(-1, "odd")}".`,
);
