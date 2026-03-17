import assert from 'assert';

/**
 * prints blue & green heart pattern based on type of number(even/odd)
 * @param n number of lines
 * Odd lines  💚
 * Even lines 💙
 * @returns string
 */

function heartPattern(n: number): string {
  if (n < 0) {
    return "Value of 'n' cannot be negative";
  }

  let result = '';

  for (let i = 1; i <= n; i++) {
    const heart = i % 2 === 1 ? '💚' : '💙';

    for (let j = 1; j <= i; j++) {
      result += heart;

      if (j < i) {
        result += ' ';
      }
    }

    if (i < n) {
      result += '\n';
    }
  }

  return result;
}

const n1 = 1;
const n2 = 2;
const n3 = 3;
const n4 = -1;

assert(heartPattern(n1) === '💚', `Expected "💚" but received "${heartPattern(n1)}".`);

assert(
  heartPattern(n2) === '💚\n💙 💙',
  `Expected "💚\\n💙 💙" but received "${heartPattern(n2)}".`
);

assert(
  heartPattern(n3) === '💚\n💙 💙\n💚 💚 💚',
  `Expected "💚\\n💙 💙\\n💚 💚 💚" but received "${heartPattern(n3)}".`
);

assert(
  heartPattern(n4) === "Value of 'n' cannot be negative",
  `Expected "Value of 'n' cannot be negative" but received "${heartPattern(n4)}".`
);
