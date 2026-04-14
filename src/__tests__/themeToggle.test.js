import { initThemeToggle, getCurrentTheme, isDarkMode } from '../js/themeToggle.js';

// jsdom does not implement window.matchMedia — provide a minimal mock
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

function setupDOM(theme = null) {
  document.body.innerHTML = `
    <button id="theme-toggle" aria-pressed="false">
      <i id="theme-icon" class="fa-solid fa-moon"></i>
      <span class="visually-hidden">Toggle dark mode</span>
    </button>
  `;
  document.documentElement.removeAttribute('data-bs-theme');
  localStorage.clear();
  if (theme) localStorage.setItem('theme', theme);
}

describe('initThemeToggle', () => {
  beforeEach(() => setupDOM());

  test('applies saved light theme on init', () => {
    localStorage.setItem('theme', 'light');
    initThemeToggle();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  test('applies saved dark theme on init', () => {
    localStorage.setItem('theme', 'dark');
    initThemeToggle();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  test('defaults to light when no preference saved', () => {
    initThemeToggle();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  test('toggles from light to dark on button click', () => {
    localStorage.setItem('theme', 'light');
    initThemeToggle();
    document.getElementById('theme-toggle').click();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark');
  });

  test('toggles from dark to light on button click', () => {
    localStorage.setItem('theme', 'dark');
    initThemeToggle();
    document.getElementById('theme-toggle').click();
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light');
  });

  test('does not persist to localStorage on init when no preference is saved', () => {
    initThemeToggle();
    expect(localStorage.getItem('theme')).toBeNull();
  });

  test('persists theme choice to localStorage', () => {
    localStorage.setItem('theme', 'light');
    initThemeToggle();
    document.getElementById('theme-toggle').click();
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('warns gracefully when toggle elements are missing', () => {
    document.body.innerHTML = '';
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    initThemeToggle();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('getCurrentTheme', () => {
  test('returns light by default', () => {
    document.documentElement.removeAttribute('data-bs-theme');
    expect(getCurrentTheme()).toBe('light');
  });

  test('returns current attribute value', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    expect(getCurrentTheme()).toBe('dark');
  });
});

describe('isDarkMode', () => {
  test('returns false in light mode', () => {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    expect(isDarkMode()).toBe(false);
  });

  test('returns true in dark mode', () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    expect(isDarkMode()).toBe(true);
  });
});
