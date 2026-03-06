import movieData from "./movies.json" with { type: "json" };
import assert from "assert";
/**
 * You need to embed this json in your program and load it and have the data in a variable for your use.  Write the following functions:
* Get the array of all actor names  (cast) that are seen in the movies data.
* Get an object with keys being year and values  being the array of names of movies released in the given year (consider only 3 at max). The format should be something like this:

 */

//the array of all actor names  (cast) that are seen in the movies data.
function actors() {
  const result = movieData.reduce((acc: Set<string>, obj) => {
    obj.cast.forEach((actor) => {
      acc.add(actor);
    });

    return acc;
  }, new Set<string>());

  return [...result];
}

function moviesByYear() {
  return movieData.reduce((acc: Record<number, string[]>, movie) => {
    if (!acc[movie.year]) {
      acc[movie.year] = [];
    }

    if (acc[movie.year].length < 3) {
      acc[movie.year].push(movie.title);
    }

    return acc;
  }, {});
}

const res = {
  "2017": ["The Book of Love", "Split", "xXx: Return of Xander Cage"],
  "2018": ["Insidious: The Last Key", "The Strange Ones", "Sweet Country"],
};
assert.deepStrictEqual(moviesByYear(), res, "moviesBy year function failed ");
