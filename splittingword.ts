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

import assert from 'assert';

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const result = purchases
  .split('\n')
  .filter((line) => !line.includes('4'))
  .map((line, index) => {
    if (index === 0) return line;

    const [item, qty] = line.split(' ');
    return `${item} ${Number(qty) + 10}`;
  })
  .join('\n');

const expected = `items qty
mango 60
onion 41
water 20`;

assert.strictEqual(result, expected);

console.log(result);
