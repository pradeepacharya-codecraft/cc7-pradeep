/**
 We have the following text
const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`
We need to actually filter all lines that do not contain 4.  And then for each quantity we want to add 10. So expected output text is
`items qty
mango 60
onion 41
water 20`

 */

import assert from "assert";

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchases.split("\n");
const linesWithout4 = lines.filter((line) => !line.includes("4"));

const transformLines = linesWithout4.map((line, index) => {
  if (index === 0) {
    return line;
  } else {
    const [item, quantity] = line.split(" ");
    console.log(item, Number(quantity!) + 10);
    let a = Number(quantity);
    if (!isNaN(a)) {
      a += 10;
    }
    return `${item} ${a}`;
  }
});

let expected = ["items qty", "mango 60", "onion 41", "water 20"];
assert.deepStrictEqual(
  transformLines,
  expected,
  "list containing string is failed",
);
