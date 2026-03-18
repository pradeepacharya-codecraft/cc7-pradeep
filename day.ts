import assert from 'assert';

/**
 * converts the dayName into a number, e.g., SUN->0 MON->1, etc.
 * @param dayName
 * @returns number with respect to the particular day
 */

function getDayOfWeek(dayName: string): number {
  const day = dayName.toLowerCase();

  switch (day) {
    case 'sun':
      return 0;
    case 'mon':
      return 1;
    case 'tue':
      return 2;
    case 'wed':
      return 3;
    case 'thu':
      return 4;
    case 'fri':
      return 5;
    case 'sat':
      return 6;
    default:
      return -1;
  }
}

assert.strictEqual(getDayOfWeek('sun'), 0, "Test case 1 failed: Expected 0 for input 'sun'.");

assert.strictEqual(getDayOfWeek('MON'), 1, "Expected 1 for input 'MON'.");

assert.strictEqual(getDayOfWeek('Tue'), 2, "Expected 2 for input 'Tue'.");

assert.strictEqual(getDayOfWeek('abc'), -1, 'Expected -1 for invalid input.');
