// ============================================
// FizzBuzz Core Algorithm
// ============================================

/**
 * A single FizzBuzz result item.
 * @typedef {{ value: number, label: string }} FizzBuzzItem
 */

/**
 * Validates FizzBuzz inputs.
 *
 * @param {number} fizz  - Fizz divisor
 * @param {number} buzz  - Buzz divisor
 * @param {number} limit - Upper bound (inclusive)
 * @returns {{ valid: boolean, error: string|null }}
 */
export function validateInputs(fizz, buzz, limit) {
  if (!Number.isInteger(fizz) || fizz < 2 || fizz > 100) {
    return { valid: false, error: 'Fizz divisor must be an integer between 2 and 100.' };
  }
  if (!Number.isInteger(buzz) || buzz < 2 || buzz > 100) {
    return { valid: false, error: 'Buzz divisor must be an integer between 2 and 100.' };
  }
  if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
    return { valid: false, error: 'Count To must be an integer between 1 and 1000.' };
  }
  return { valid: true, error: null };
}

/**
 * Runs the FizzBuzz algorithm for integers 1..limit.
 *
 * Time Complexity:  O(n)
 * Space Complexity: O(n) – result array
 *
 * @param {number} fizz  - Fizz divisor (2–100)
 * @param {number} buzz  - Buzz divisor (2–100)
 * @param {number} limit - Upper bound 1..1000 (inclusive)
 * @returns {FizzBuzzItem[]}
 */
export function solveFizzBuzz(fizz, buzz, limit) {
  const results = [];
  for (let i = 1; i <= limit; i++) {
    const isFizz = i % fizz === 0;
    const isBuzz = i % buzz === 0;
    let label;
    if (isFizz && isBuzz) {
      label = 'FizzBuzz';
    } else if (isFizz) {
      label = 'Fizz';
    } else if (isBuzz) {
      label = 'Buzz';
    } else {
      label = String(i);
    }
    results.push({ value: i, label });
  }
  return results;
}

/**
 * Returns the semantic type of a FizzBuzz label.
 *
 * @param {string} label
 * @returns {'fizzbuzz' | 'fizz' | 'buzz' | 'number'}
 */
export function getLabelType(label) {
  if (label === 'FizzBuzz') return 'fizzbuzz';
  if (label === 'Fizz') return 'fizz';
  if (label === 'Buzz') return 'buzz';
  return 'number';
}

/**
 * Counts items by type in a FizzBuzz result set.
 *
 * @param {FizzBuzzItem[]} results
 * @returns {{ fizz: number, buzz: number, fizzbuzz: number, numbers: number }}
 */
export function countByType(results) {
  let fizz = 0;
  let buzz = 0;
  let fizzbuzz = 0;
  let numbers = 0;

  for (const item of results) {
    const type = getLabelType(item.label);
    if (type === 'fizzbuzz') fizzbuzz++;
    else if (type === 'fizz') fizz++;
    else if (type === 'buzz') buzz++;
    else numbers++;
  }

  return { fizz, buzz, fizzbuzz, numbers };
}
