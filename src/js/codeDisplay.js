// ============================================
// Code Display Module - Prism.js Integration
// ============================================

import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';

// Code examples are loaded as inline strings by Parcel
import javascriptCode from 'bundle-text:../code-examples/javascript.txt';
import pythonCode from 'bundle-text:../code-examples/python.txt';
import javaCode from 'bundle-text:../code-examples/java.txt';
import csharpCode from 'bundle-text:../code-examples/csharp.txt';

/** @type {Record<string, { name: string, icon: string, code: string }>} */
export const CODE_EXAMPLES = {
  javascript: {
    name: 'JavaScript',
    icon: 'fa-brands fa-js',
    code: javascriptCode,
  },
  python: {
    name: 'Python',
    icon: 'fa-brands fa-python',
    code: pythonCode,
  },
  java: {
    name: 'Java',
    icon: 'fa-brands fa-java',
    code: javaCode,
  },
  csharp: {
    name: 'C#',
    icon: 'fa-solid fa-code',
    code: csharpCode,
  },
};

/** Currently active language key. */
let activeLanguage = 'javascript';

/**
 * Initialises the code display and language tab wiring.
 */
export function initCodeDisplay() {
  const codeDisplay = document.getElementById('codeDisplay');
  const languageTabs = document.querySelectorAll('[data-language]');
  const copyBtn = document.getElementById('copyCodeBtn');

  if (!codeDisplay) {
    console.error('codeDisplay element not found');
    return;
  }

  displayCode('javascript');

  languageTabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const language = tab.getAttribute('data-language');

      languageTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeLanguage = language;
      displayCode(language);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => copyCode(activeLanguage));
  }

  console.log('Code display initialized');
}

/**
 * Renders syntax-highlighted code for the given language.
 * @param {string} language
 */
function displayCode(language) {
  const codeDisplay = document.getElementById('codeDisplay');
  const example = CODE_EXAMPLES[language];

  if (!example || !codeDisplay) {
    console.error('Invalid language or missing codeDisplay element');
    return;
  }

  const languageClass = language === 'csharp' ? 'language-csharp' : `language-${language}`;

  codeDisplay.textContent = '';
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.className = languageClass;
  code.textContent = example.code;
  pre.appendChild(code);
  codeDisplay.appendChild(pre);

  Prism.highlightAll();
}

/**
 * Copies the code for the given language to the clipboard.
 * @param {string} language
 */
export function copyCode(language) {
  const example = CODE_EXAMPLES[language];
  if (!example) {
    console.error('Invalid language:', language);
    return;
  }

  navigator.clipboard
    .writeText(example.code)
    .then(() => {
      if (window.showSuccess) {
        window.showSuccess('Code copied to clipboard!');
      }
    })
    .catch((err) => {
      console.error('Failed to copy code:', err);
      if (window.showError) {
        window.showError('Failed to copy code.');
      }
    });
}
