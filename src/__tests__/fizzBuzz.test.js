import { solveFizzBuzz, validateInputs, getLabelType, countByType } from '../js/fizzBuzz.js';

// ── validateInputs ────────────────────────────────────────────────────────────
describe('validateInputs', () => {
  test('accepts valid classic defaults', () => {
    expect(validateInputs(3, 5, 100).valid).toBe(true);
  });

  test('accepts boundary minimums (fizz=2, buzz=2, limit=1)', () => {
    expect(validateInputs(2, 2, 1).valid).toBe(true);
  });

  test('accepts boundary maximums (fizz=100, buzz=100, limit=1000)', () => {
    expect(validateInputs(100, 100, 1000).valid).toBe(true);
  });

  test('rejects fizz < 2', () => {
    const result = validateInputs(1, 5, 100);
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/Fizz/i);
  });

  test('rejects fizz > 100', () => {
    expect(validateInputs(101, 5, 100).valid).toBe(false);
  });

  test('rejects buzz < 2', () => {
    expect(validateInputs(3, 1, 100).valid).toBe(false);
  });

  test('rejects buzz > 100', () => {
    expect(validateInputs(3, 101, 100).valid).toBe(false);
  });

  test('rejects limit < 1', () => {
    expect(validateInputs(3, 5, 0).valid).toBe(false);
  });

  test('rejects limit > 1000', () => {
    expect(validateInputs(3, 5, 1001).valid).toBe(false);
  });

  test('rejects non-integer fizz', () => {
    expect(validateInputs(3.5, 5, 100).valid).toBe(false);
  });

  test('rejects NaN inputs', () => {
    expect(validateInputs(NaN, 5, 100).valid).toBe(false);
  });
});

// ── solveFizzBuzz ─────────────────────────────────────────────────────────────
describe('solveFizzBuzz', () => {
  test('returns array of length equal to limit', () => {
    expect(solveFizzBuzz(3, 5, 100)).toHaveLength(100);
    expect(solveFizzBuzz(3, 5, 1)).toHaveLength(1);
    expect(solveFizzBuzz(3, 5, 15)).toHaveLength(15);
  });

  test('item 1 is a plain number', () => {
    const results = solveFizzBuzz(3, 5, 5);
    expect(results[0]).toEqual({ value: 1, label: '1' });
  });

  test('item at Fizz-divisible position is "Fizz"', () => {
    const results = solveFizzBuzz(3, 5, 15);
    expect(results[2].label).toBe('Fizz'); // i=3
    expect(results[5].label).toBe('Fizz'); // i=6
  });

  test('item at Buzz-divisible position is "Buzz"', () => {
    const results = solveFizzBuzz(3, 5, 15);
    expect(results[4].label).toBe('Buzz');  // i=5
    expect(results[9].label).toBe('Buzz');  // i=10
  });

  test('item divisible by both is "FizzBuzz"', () => {
    const results = solveFizzBuzz(3, 5, 15);
    expect(results[14].label).toBe('FizzBuzz'); // i=15
  });

  test('value field equals loop integer', () => {
    const results = solveFizzBuzz(3, 5, 5);
    results.forEach((item, idx) => expect(item.value).toBe(idx + 1));
  });

  test('custom divisors: fizz=2, buzz=7', () => {
    const results = solveFizzBuzz(2, 7, 14);
    expect(results[1].label).toBe('Fizz');      // i=2  (2%2=0, 2%7≠0)
    expect(results[13].label).toBe('FizzBuzz'); // i=14 (14%2=0, 14%7=0)
    expect(results[6].label).toBe('Buzz');      // i=7  (7%2≠0, 7%7=0)
  });

  test('same fizz and buzz divisor produces FizzBuzz for every multiple', () => {
    const results = solveFizzBuzz(5, 5, 10);
    expect(results[4].label).toBe('FizzBuzz');  // i=5
    expect(results[9].label).toBe('FizzBuzz');  // i=10
    expect(results[0].label).toBe('1');         // i=1
  });

  test('limit=1 returns exactly one item', () => {
    const results = solveFizzBuzz(3, 5, 1);
    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({ value: 1, label: '1' });
  });
});

// ── getLabelType ──────────────────────────────────────────────────────────────
describe('getLabelType', () => {
  test('"FizzBuzz" → fizzbuzz', () => expect(getLabelType('FizzBuzz')).toBe('fizzbuzz'));
  test('"Fizz" → fizz',         () => expect(getLabelType('Fizz')).toBe('fizz'));
  test('"Buzz" → buzz',         () => expect(getLabelType('Buzz')).toBe('buzz'));
  test('"42" → number',         () => expect(getLabelType('42')).toBe('number'));
  test('"1" → number',          () => expect(getLabelType('1')).toBe('number'));
});

// ── countByType ───────────────────────────────────────────────────────────────
describe('countByType', () => {
  test('classic 3/5/15 counts', () => {
    const results = solveFizzBuzz(3, 5, 15);
    const counts = countByType(results);
    // Fizz:  3,6,9,12         → 4
    // Buzz:  5,10             → 2
    // FizzBuzz: 15            → 1
    // Numbers: 1,2,4,7,8,11,13,14 → 8
    expect(counts.fizz).toBe(4);
    expect(counts.buzz).toBe(2);
    expect(counts.fizzbuzz).toBe(1);
    expect(counts.numbers).toBe(8);
  });

  test('total equals results length', () => {
    const results = solveFizzBuzz(3, 5, 100);
    const counts = countByType(results);
    expect(counts.fizz + counts.buzz + counts.fizzbuzz + counts.numbers).toBe(100);
  });

  test('empty array returns all zeros', () => {
    const counts = countByType([]);
    expect(counts).toEqual({ fizz: 0, buzz: 0, fizzbuzz: 0, numbers: 0 });
  });
});
