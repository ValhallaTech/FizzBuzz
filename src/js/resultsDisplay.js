// ============================================
// Results Display Module
// ============================================

import { getLabelType, countByType } from './fizzBuzz.js';

/**
 * Renders the FizzBuzz sequence into #resultsOutput and stats into #statsDisplay.
 *
 * @param {import('./fizzBuzz.js').FizzBuzzItem[]} results
 */
export function renderResults(results) {
  renderSequence(results);
  renderStats(results);
}

/**
 * Renders the color-coded badge grid.
 * @param {import('./fizzBuzz.js').FizzBuzzItem[]} results
 */
function renderSequence(results) {
  const output = document.getElementById('resultsOutput');
  if (!output) {
    console.error('resultsOutput element not found');
    return;
  }

  if (results.length === 0) {
    output.innerHTML = '<p class="text-muted">No results to display.</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of results) {
    const type = getLabelType(item.label);
    const span = document.createElement('span');
    span.className = `badge result-badge ${type}-badge`;
    span.setAttribute('title', `${item.value}: ${item.label}`);
    span.textContent = item.label;
    fragment.appendChild(span);
  }

  output.textContent = '';
  output.appendChild(fragment);
}

/**
 * Renders the statistics bar.
 * @param {import('./fizzBuzz.js').FizzBuzzItem[]} results
 */
function renderStats(results) {
  const stats = document.getElementById('statsDisplay');
  if (!stats) return;

  if (results.length === 0) {
    stats.textContent = '';
    return;
  }

  const counts = countByType(results);
  const total = results.length;

  stats.textContent = '';

  const items = [
    { label: 'Total', value: total, cls: 'text-secondary' },
    { label: 'Fizz', value: counts.fizz, cls: 'text-primary' },
    { label: 'Buzz', value: counts.buzz, cls: 'text-success' },
    { label: 'FizzBuzz', value: counts.fizzbuzz, cls: 'text-warning' },
    { label: 'Numbers', value: counts.numbers, cls: 'text-muted' },
  ];

  for (const item of items) {
    const span = document.createElement('span');
    span.className = `stats-item me-3 small ${item.cls}`;
    span.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
    stats.appendChild(span);
  }
}
