import assert from 'assert';

/**
 * Pattern alternates 💚 and 💙 in each row
 * @param n  represent number of line
 * @returns string
 */
function alternatingHeartPattern(n: number): string {
  if (n < 0) {
    return "Value of 'n' cannot be negative";
  }

  let result = '';

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      if (j % 2 === 1) {
        result += '💚';
      } else {
        result += '💙';
      }

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

assert(
  alternatingHeartPattern(n1) === '💚',
  `For input ${n1}, we expected the following result:\n"💚"\nBut received:\n"${alternatingHeartPattern(n1)}"`
);

assert(
  alternatingHeartPattern(n2) === '💚\n💚 💙',
  `For input ${n2}, we expected the following result:\n"💚\\n💚 💙"\nBut received:\n"${alternatingHeartPattern(n2)}"`
);

assert(
  alternatingHeartPattern(n3) === '💚\n💚 💙\n💚 💙 💚',
  `For input ${n3}, we expected the following result:\n"💚\\n💚 💙\\n💚 💙 💚"\nBut received:\n"${alternatingHeartPattern(n3)}"`
);

assert(
  alternatingHeartPattern(n4) === "Value of 'n' cannot be negative",
  `For input ${n4}, we expected the following result:\n"Value of 'n' cannot be negative"\nBut received:\n"${alternatingHeartPattern(n4)}"`
);
