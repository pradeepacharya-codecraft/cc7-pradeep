// We want to find the total salary paid for employees whose age is less than 30.
// Get the array of full-names of all employees. Full name is made up from first name and last name.
// Get a string that contains all email ids separated by comma.
import assert from "assert";

const employees = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

/**
 * finding the total salary paid for employees whose age is less than 30.
 */

function Salary(): number {
  return employees
    .filter((employee) => {
      return employee.age <= 30;
    })
    .reduce((acc, employee) => {
      acc = acc + employee.salary;
      return acc;
    }, 0);
}

assert.strictEqual(Salary(), 16124, "salary function is failed");

//Get the array of full-names of all employees. Full name is made up from first name and last name.

function employeeName() {
  return employees.map((employee) => {
    return employee.firstName + " " + employee.lastName;
  });
}

assert.deepStrictEqual(
  employeeName(),
  [
    "Molly Rojas",
    "Marguerite Santiago",
    "Evelyn Oneil",
    "Consuelo Case",
    "Earline Bush",
    "Sanford Hurley",
    "Todd Gomez",
  ],
  "  function didnt  properly filter the employee names",
);

//Get a string that contains all email ids separated by comma.
function emailid() {
  return employees.reduce((acc, current) => {
    if (acc == "") {
      acc = acc + current.email;
    } else {
      acc = acc + ", " + current.email;
    }

    return acc.trimStart();
  }, "");
}

assert.strictEqual(
  emailid(),
  "mollyrojas@plasmox.com, margueritesantiago@plasmox.com, evelynoneil@plasmox.com, consuelocase@plasmox.com, earlinebush@plasmox.com, sanfordhurley@plasmox.com, toddgomez@plasmox.com",
  "failed to represent the  emaild ids in  single string",
);
