/**
Write the following string manipulation functions
trimLeading(str) Trims a string such that all leading whitespaces are removed.
trimTrailing(str) this will trim whitespaces at the end of the string.
should convert the given string to lowercase
appends a cat emojee
Use compose or pipe mechanism to come up with a function  trim,  that composes the above functions.  Test it with some inputs.

 */
import assert from 'assert';

type FuncT<T> = (arg: T) => T;

const pipe = <T>(...fns: FuncT<T>[]): FuncT<T> => {
  return (x: T) => {
    return fns.reduce((accumulated, current) => current(accumulated), x);
  };
};

const trimRight = (str: string) => str.trimEnd();
const trimLeft = (str: string) => str.trimStart();
const toLower = (str: string) => str.toLocaleLowerCase();
const catEmojee = (str: string) => str + '🐱';

const tap = (message: string) => (str: string) => {
  console.log(message, ':', str);
  return str;
};

const trimRtrTrimLCatEmojeeCompose = pipe(
  catEmojee,
  tap('after catEmojee'),
  trimLeft,

  tap('After toLower'),
  trimRight,
  tap('After trimRight'),
  toLower
);

assert.deepStrictEqual(
  trimRtrTrimLCatEmojeeCompose('  Welcome to Ts and Js course '),
  'welcome to ts and js course 🐱',
  'pip line failed'
);
