// ============================================
// Solve Page Entry Point (solve.html)
// ============================================

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/custom.css';

import { initThemeToggle } from './themeToggle.js';
import { showError, showSuccess } from './toast.js';
import { solveFizzBuzz, validateInputs } from './fizzBuzz.js';
import { renderResults } from './resultsDisplay.js';

// ── DOM references ──────────────────────────────────────────────────────────
const fizzInput = document.getElementById('fizzInput');
const buzzInput = document.getElementById('buzzInput');
const limitInput = document.getElementById('limitInput');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');

const DEFAULTS = { fizz: 3, buzz: 5, limit: 100 };

// ── Init ─────────────────────────────────────────────────────────────────────
initThemeToggle();

// ── Actions ───────────────────────────────────────────────────────────────────
function generate() {
  const fizz = parseInt(fizzInput.value, 10);
  const buzz = parseInt(buzzInput.value, 10);
  const limit = parseInt(limitInput.value, 10);

  const validation = validateInputs(fizz, buzz, limit);
  if (!validation.valid) {
    showError(validation.error);
    return;
  }

  const results = solveFizzBuzz(fizz, buzz, limit);
  renderResults(results);
  showSuccess(`Generated FizzBuzz from 1 to ${limit} (Fizz=${fizz}, Buzz=${buzz}).`);
}

function resetDefaults() {
  fizzInput.value = DEFAULTS.fizz;
  buzzInput.value = DEFAULTS.buzz;
  limitInput.value = DEFAULTS.limit;
  generate();
}

// ── Event listeners ───────────────────────────────────────────────────────────
generateBtn.addEventListener('click', generate);
resetBtn.addEventListener('click', resetDefaults);

[fizzInput, buzzInput, limitInput].forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') generate();
  });
});

// ── Auto-generate on load ─────────────────────────────────────────────────────
generate();

console.log('FizzBuzz solve page initialized');
