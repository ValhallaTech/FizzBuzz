// ============================================
// Theme Toggle - Dark/Light Mode Management
// ============================================

/**
 * Initializes the theme toggle functionality.
 * - Respects system preference and localStorage
 * - Provides smooth theme transitions
 */
export function initThemeToggle() {
  const html = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  if (!toggle || !icon) {
    console.warn('Theme toggle elements not found on this page');
    return;
  }

  const savedTheme = getSavedOrPreferredTheme();
  applyTheme(savedTheme, false);

  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme, true);
  });

  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });

  console.log(`Theme initialized: ${savedTheme} mode`);

  function getSavedOrPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme, animate = true) {
    if (animate) {
      document.body.classList.add('theme-transitioning');
    }
    html.setAttribute('data-bs-theme', theme);
    updateToggleButton(theme);
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme, isDark: theme === 'dark' } }));
    if (animate) {
      setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
      }, 300);
    }
  }

  function setTheme(theme, animate = true) {
    applyTheme(theme, animate);
    localStorage.setItem('theme', theme);
  }

  function updateToggleButton(theme) {
    const isDark = theme === 'dark';
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    const srText = toggle.querySelector('.visually-hidden');
    if (srText) {
      srText.textContent = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }
}

/**
 * Returns the current theme.
 * @returns {'light' | 'dark'}
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-bs-theme') || 'light';
}

/**
 * Returns whether dark mode is active.
 * @returns {boolean}
 */
export function isDarkMode() {
  return getCurrentTheme() === 'dark';
}
