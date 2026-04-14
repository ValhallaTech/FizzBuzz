// ============================================
// Code Page Entry Point (code.html)
// ============================================

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '../styles/custom.css';

import { initThemeToggle } from './themeToggle.js';
import { showSuccess, showError } from './toast.js';
import { initCodeDisplay } from './codeDisplay.js';

// Expose toast helpers so codeDisplay.js copy function can use them
window.showSuccess = showSuccess;
window.showError = showError;

initThemeToggle();
initCodeDisplay();

console.log('FizzBuzz code page initialized');
