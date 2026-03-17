/**
 We have this list of food item ingredients.
 const foods = [{ idli: ['rice', 'urad', 'oil', 'cashew''water'] },
                { chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
                { pizza: ['maida', 'sugar', 'oil', 'chiili', 'flakes', 'sause'] },
                { 'paneer masala': ['paneer', 'onion', 'tomato', 'garlic', 'oil'] },
               ];
 Can you find the food items that do not contain sugar here? // ["idli", "paneer masala"]
 and Food items that contain both chilli and oil ?  // ["pizza"]

 */

import assert from 'assert';

const foods = [
  { idli: ['rice', 'urad', 'oil', 'cashew', 'water'] },
  { chapathi: ['atta', 'gluten', 'water', 'oil', 'sugar'] },
  { pizza: ['maida', 'sugar', 'oil', 'chilli', 'flakes', 'sause'] },
  { paneermasala: ['paneer', 'onion', 'tomato', 'garlic', 'oil'] }
];

// Foods without sugar
const noSugarFoods = foods
  .filter((food) => {
    const ingredients = Object.values(food)[0];
    return !ingredients?.includes('sugar');
  })
  .map((food) => Object.keys(food)[0]);

assert.deepStrictEqual(
  noSugarFoods,
  ['idli', 'paneermasala'],
  'filtering the food which dont have sugar in it has failed'
);

//food which has both chili and oil

const chilliOilyFood = foods
  .filter((food) => {
    const ingredients = Object.values(food)[0];
    return ingredients!.includes('chilli') && ingredients?.includes('oil');
  })
  .map((food) => Object.keys(food)[0]);

assert.deepStrictEqual(
  chilliOilyFood,
  ['pizza'],
  'fitering the food which have oil and  chilly in it has failed'
);
