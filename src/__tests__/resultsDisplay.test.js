import { renderResults } from '../js/resultsDisplay.js';
import { solveFizzBuzz } from '../js/fizzBuzz.js';

function setupDOM() {
  document.body.innerHTML = `
    <div id="resultsOutput"></div>
    <div id="statsDisplay"></div>
  `;
}

describe('renderResults', () => {
  beforeEach(setupDOM);

  test('renders badges into #resultsOutput', () => {
    const results = solveFizzBuzz(3, 5, 15);
    renderResults(results);
    const badges = document.querySelectorAll('.result-badge');
    expect(badges.length).toBe(15);
  });

  test('fizz badge has fizz-badge class', () => {
    const results = solveFizzBuzz(3, 5, 3);
    renderResults(results);
    const badges = document.querySelectorAll('.result-badge');
    // i=3 → Fizz
    expect(badges[2].classList.contains('fizz-badge')).toBe(true);
  });

  test('buzz badge has buzz-badge class', () => {
    const results = solveFizzBuzz(3, 5, 5);
    renderResults(results);
    const badges = document.querySelectorAll('.result-badge');
    // i=5 → Buzz
    expect(badges[4].classList.contains('buzz-badge')).toBe(true);
  });

  test('fizzbuzz badge has fizzbuzz-badge class', () => {
    const results = solveFizzBuzz(3, 5, 15);
    renderResults(results);
    const badges = document.querySelectorAll('.result-badge');
    // i=15 → FizzBuzz
    expect(badges[14].classList.contains('fizzbuzz-badge')).toBe(true);
  });

  test('number badge has number-badge class', () => {
    const results = solveFizzBuzz(3, 5, 1);
    renderResults(results);
    const badges = document.querySelectorAll('.result-badge');
    expect(badges[0].classList.contains('number-badge')).toBe(true);
  });

  test('renders stats into #statsDisplay', () => {
    const results = solveFizzBuzz(3, 5, 15);
    renderResults(results);
    const stats = document.getElementById('statsDisplay');
    expect(stats.textContent).toContain('Total');
    expect(stats.textContent).toContain('15');
  });

  test('shows fallback message for empty results', () => {
    renderResults([]);
    expect(document.getElementById('resultsOutput').textContent).toContain('No results');
  });

  test('handles missing #resultsOutput gracefully', () => {
    document.body.innerHTML = '<div id="statsDisplay"></div>';
    expect(() => renderResults(solveFizzBuzz(3, 5, 5))).not.toThrow();
  });
});
