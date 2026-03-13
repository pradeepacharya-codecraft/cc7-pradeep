// We want to get an object that will have keys as author names, and values will be an array of their quotes.
// A function getQuotesContainingWord(word). that will return an array of quotes (not the quote objects)  that contain the specified word.
// Get the array of quote strings
// Array of all authors by removing any duplicates using reduce.

import assert from "assert";
const quotes = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];

const quotesByAuthor = quotes.reduce<Record<string, string[]>>((acc, quote) => {
  if (!acc[quote.author]) {
    acc[quote.author] = [];
  }

  acc[quote.author]?.push(quote.text);

  return acc;
}, {});

assert.deepStrictEqual(
  quotesByAuthor,
  {
    "Thomas Edison": [
      "Genius is one percent inspiration and ninety-nine percent perspiration.",
      "To invent, you need a good imagination and a pile of junk",
    ],
    "Yogi Berra": [
      "You can observe a lot just by watching.",
      "Difficulties increase the nearer we get to the goal.",
      "Life is a learning experience, only if you learn.",
    ],
    "Byron Pulsifer": [
      "Fate is in your hands and no one elses",
      "Nothing happens unless first we dream.",
      "What you give is what you get.",
    ],
    "Lao Tzu": [
      "Be the chief but never the lord.",
      "We can only learn to love by loving.",
    ],
    Aristotle: ["Well begun is half done."],
    "Margaret Sangster": ["Self-complacency is fatal to progress."],
    Buddha: [
      "Peace comes from within. Do not seek it without.",
      "You'll see it when you believe it.",
    ],
    "Karen Clark": ["Life is change. Growth is optional. Choose wisely."],
  },
  "quotesByAuthor grouping failed",
);

/**
 * filtering out the quote whcih has given word
 */

function getQuotesContainingWord(word: string) {
  return quotes
    .filter((quote) => {
      word = word.toLowerCase();
      const txt = quote.text.toLowerCase();
      return txt.includes(word);
    })
    .map((quote) => quote.text);
}

assert.deepStrictEqual(
  getQuotesContainingWord("dream"),
  ["Nothing happens unless first we dream."],
  "Filtering by word 'dream' failed",
);

assert.deepStrictEqual(
  getQuotesContainingWord("peace"),
  ["Peace comes from within. Do not seek it without."],
  "Filtering by word 'peace' failed",
);


/**
 * retrieving the quote text
 * @returns quote text
 */

function getQuoteString() {
  return quotes.map((quote) => quote.text);
}

assert.deepStrictEqual(
  getQuoteString(),
  [
    "Genius is one percent inspiration and ninety-nine percent perspiration.",
    "You can observe a lot just by watching.",
    "To invent, you need a good imagination and a pile of junk",
    "Difficulties increase the nearer we get to the goal.",
    "Fate is in your hands and no one elses",
    "Be the chief but never the lord.",
    "Nothing happens unless first we dream.",
    "Well begun is half done.",
    "Life is a learning experience, only if you learn.",
    "Self-complacency is fatal to progress.",
    "Peace comes from within. Do not seek it without.",
    "What you give is what you get.",
    "We can only learn to love by loving.",
    "Life is change. Growth is optional. Choose wisely.",
    "You'll see it when you believe it.",
  ],
  "getQuoteString failed to return correct quote texts",
);



/**
 * Array of all authors by removing any duplicates using reduce.
 * @returns a list containing author names init.
 */

function authorNames() {
  return quotes.reduce<string[]>((acc, cQuote) => {
    if (!acc.includes(cQuote.author)) {
      acc.push(cQuote.author);
    }
    return acc;
  }, []);
}

assert.deepStrictEqual(
  authorNames().sort(),
  [
    "Thomas Edison",
    "Yogi Berra",
    "Byron Pulsifer",
    "Lao Tzu",
    "Aristotle",
    "Margaret Sangster",
    "Buddha",
    "Karen Clark",
  ].sort(),
  "authorNames did not return unique authors correctly",
);
