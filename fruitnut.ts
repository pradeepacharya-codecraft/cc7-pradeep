import assert from 'assert';

//We have an array that contains a list of objects that represent a fruit or a nut like so.
const objects = [
  {
    name: 'Banana',
    type: 'fruit',
    treats: ['constipation', 'vitamin deficiency', 'skin issues', 'sleep problems'],
    nutritions: {
      protein: 8,
      carbs: 40,
      sugar: 30,
      vitamins: 45
    }
  },
  {
    name: 'Badam',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'sugar'],
    nutritions: {
      protein: 18,
      carbs: 20,
      sugar: 20,
      vitamins: 65
    }
  },
  {
    name: 'Cashew',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60
    }
  },
  {
    name: 'Wallnut',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: {
      protein: 33,
      carbs: 26,
      vitamins: 64
    }
  },
  {
    name: 'Apple',
    type: 'fruit',
    treats: ['heart problems', 'skin issues', 'bone issues', 'migraine'],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60
    }
  }
];

/**
Implemented a function that will generate an object that will contain a key for each nutrition, and the value should be a fruit or nut that has highest content of that nutrition. If there is a tie, choose  the first one.
 */

function highNutrition() {
  const max: Record<string, number> = {};

  return objects.reduce(
    (acc, current) => {
      for (const [nutrient, value] of Object.entries(current.nutritions)) {
        if (max[nutrient] === undefined || value > max[nutrient]) {
          max[nutrient] = value;
          acc[nutrient] = current.name;
        }
      }
      return acc;
    },
    {} as Record<string, string>
  );
}

const expected = {
  protein: 'Wallnut',
  carbs: 'Banana',
  sugar: 'Banana',
  vitamins: 'Badam'
};

assert.deepStrictEqual(
  highNutrition(),
  expected,
  ' highNutrition function failed to filterout the  high nutrition values correctly'
);

/**
 * Get an array of all unique nutritions that are present in all the fruits and nuts above
 */

function getUniqueNutritions() {
  const nutritions = objects.reduce((acc, current) => {
    Object.keys(current.nutritions).forEach((nutrient) => {
      acc.add(nutrient);
    });
    return acc;
  }, new Set<string>());

  return [...nutritions];
}

const nutritions = ['protein', 'carbs', 'sugar', 'vitamins'];

assert.deepStrictEqual(
  getUniqueNutritions(),
  nutritions,
  'function failed to retrieve the nutritions from the objects '
);

/**
 * Get an array of all unique health conditions that the fruits treat.
 */

function UniqueHealthTreatment() {
  const treatement = objects
    .filter((obj) => obj.type === 'fruit')
    .reduce((acc, current) => {
      current.treats.forEach((elem) => {
        acc.add(elem);
      });

      return acc;
    }, new Set<string>());
  return [...treatement];
}

assert.deepStrictEqual(
  UniqueHealthTreatment(),
  [
    'constipation',
    'vitamin deficiency',
    'skin issues',
    'sleep problems',
    'heart problems',
    'bone issues',
    'migraine'
  ],
  'failed to filterout all unique health conditions that the fruits treat'
);

/**
 * Get the array of all common health conditions that are treated by  all nuts.
 */

function commonNutTreatment() {
  return objects
    .filter((object) => object.type === 'nut')
    .reduce((acc: string[], current) => {
      if (acc.length === 0) {
        return [...current.treats];
      }

      return acc.filter((item) => current.treats.includes(item));
    }, []);
}

const nutbenefit = ['bp', 'protein deficiency', 'skin issues'];
assert.deepStrictEqual(
  commonNutTreatment(),
  nutbenefit,
  'function failed to give us the comman nut benefit'
);

/**
 * Get a modified array of the fruits and nuts, where a new key called, totalNutritions get added to each object.  Total nutritions is nothing but the total of the values of the nutritions keys.
 */

function addTotalNutritions() {
  return objects.map((obj) => {
    const total = Object.values(obj.nutritions).reduce((sum, value) => sum + value, 0);

    return {
      ...obj,
      totalNutritions: total
    };
  });
}

const result = [
  {
    name: 'Banana',
    type: 'fruit',
    treats: ['constipation', 'vitamin deficiency', 'skin issues', 'sleep problems'],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
    totalNutritions: 123
  },
  {
    name: 'Badam',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'sugar'],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
    totalNutritions: 123
  },
  {
    name: 'Cashew',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNutritions: 104
  },
  {
    name: 'Wallnut',
    type: 'nut',
    treats: ['bp', 'protein deficiency', 'skin issues', 'bone issues'],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
    totalNutritions: 123
  },
  {
    name: 'Apple',
    type: 'fruit',
    treats: ['heart problems', 'skin issues', 'bone issues', 'migraine'],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNutritions: 104
  }
];
assert.deepStrictEqual(
  addTotalNutritions(),
  result,
  'function failed to return the object with the added property'
);

/**
 * Find the total nutrition value of all fruits and nuts
 */

const totalNutrition = () =>
  objects.reduce(
    (acc, obj) => acc + Object.values(obj.nutritions).reduce((sum, val) => sum + val, 0),
    0
  );

assert.deepStrictEqual(totalNutrition(), 577, 'total nutrition value didnt match');

/**
 * Which fruits  / nuts solve the bone issues
 */

function boneIssueNutrition() {
  const fruit_nut = objects.filter((obj) => {
    return obj.treats.includes('bone issues');
  });

  return fruit_nut.map((obj) => obj.name);
}

const bone_nutritions = ['Cashew', 'Wallnut', 'Apple'];
assert.deepStrictEqual(
  boneIssueNutrition(),
  bone_nutritions,
  'function boneNutrition failed to filter out the nutrition which helps to solve bone related problems '
);

/**
 * Which fruit or nut has maximum nutrition types ( like different type of nutritions)?
 */

function maxNutritionTypes() {
  const maxCount = objects.reduce((max, obj) => {
    const count = Object.keys(obj.nutritions).length;

    if (count > max) {
      return count;
    }

    return max;
  }, 0);

  const result = objects.filter((obj) => {
    const count = Object.keys(obj.nutritions).length;
    return count === maxCount;
  });

  return result.map((obj) => obj.name);
}

assert.deepStrictEqual(
  maxNutritionTypes(),
  ['Banana', 'Badam'],
  'function which return max nutrion item didnt match the exact result'
);

/**
 * Which fruits or nuts solve migraine and have vitamins greater than or equal to 60
 */

function migraneVitamin() {
  return objects
    .filter((obj) => obj.treats.includes('migraine') && obj.nutritions.vitamins >= 60)
    .map((obj) => obj.name);
}

assert.deepStrictEqual(
  migraneVitamin(),
  ['Apple'],
  'function failed to return  the fruits or nuts solve migraine and have vitamins greater than or equal to 60'
);

/**
 * Which fruit or nut has lowest carbs? (Ignore the fruits/nuts that don't have carbs in the first place)
 */

function lowestCarbs() {
  return objects
    .reduce<[string, number][]>((acc, obj) => {
      if (obj.nutritions.carbs === undefined) {
        return acc;
      }
      if (acc.length === 0) {
        acc.push([obj.name, obj.nutritions.carbs]);
        return acc;
      }
      if (acc[0][1] > obj.nutritions.carbs) {
        acc.length = 0;
        acc.push([obj.name, obj.nutritions.carbs]);
      } else if (acc[0][1] === obj.nutritions.carbs) {
        acc.push([obj.name, obj.nutritions.carbs]);
      }
      return acc;
    }, [])
    .map((e) => e[0]);
}

assert.deepStrictEqual(lowestCarbs(), ['Badam'], 'failed to filterout lowest carb nutrition');

/**
 * What is the total amount of proteins I will end up intaking if I eat each of the nuts except nuts those do not solve sugar issues as doctor has warned that my skin will become pale in case I eat such nuts?
 */
function totalProtein() {
  return objects
    .filter((obj) => obj.type === 'nut' && obj.treats.includes('sugar'))
    .reduce((acc, obj) => {
      return acc + obj.nutritions.protein;
    }, 0);
}

assert.strictEqual(totalProtein(), 18, 'totalProtein function failed');

/**
 * If I eat one fruit and nut  each from the all fruits and nuts available in the above list, what is the quantity of vitamins I will end up intaking? Doctor has asked me to avoid fruit containing any sugar in it.
 */

function totalVitamins() {
  return objects
    .filter((obj) => !(obj.type === 'fruit' && obj.nutritions.sugar))
    .reduce((acc, obj) => {
      if (obj.nutritions.vitamins) {
        return acc + obj.nutritions.vitamins;
      }

      return acc;
    }, 0);
}

assert.strictEqual(totalVitamins(), 249, 'totalVitamin function faield');
