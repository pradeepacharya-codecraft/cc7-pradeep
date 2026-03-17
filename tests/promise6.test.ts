import { it, describe, expect } from 'vitest';

import { getUsers } from '../promise6.ts';

describe('getUsers', () => {
  it('should fetch users', async () => {
    const users = await getUsers();

    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('name');
  });
});
