// Implement the following function

// function getUsers(delay = 2000):Promise<User[]>
// should do a GET from : https://jsonplaceholder.typicode.com/users
// this function should introduce an additional delay of 2 secs (by default) before it can return the result as a promise.

// Implement a simple vitest based test for the above.

import { delay } from "./promise5.ts";

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export async function getUsers(delayy = 2000): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    await delay(delayy);

    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch users", { cause: error });
  }
}
