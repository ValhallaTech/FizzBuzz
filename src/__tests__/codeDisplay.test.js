// Mock Prism before importing codeDisplay (it runs Prism.highlightAll on every render)
jest.mock('prismjs', () => ({ highlightAll: jest.fn() }));
jest.mock('prismjs/components/prism-javascript', () => {});
jest.mock('prismjs/components/prism-python', () => {});
jest.mock('prismjs/components/prism-java', () => {});
jest.mock('prismjs/components/prism-csharp', () => {});

import { initCodeDisplay, copyCode, CODE_EXAMPLES } from '../js/codeDisplay.js';

function setupDOM() {
  document.body.innerHTML = `
    <div id="codeDisplay"></div>
    <button data-language="javascript" class="active" aria-selected="true">JS</button>
    <button data-language="python" aria-selected="false">Python</button>
    <button data-language="java" aria-selected="false">Java</button>
    <button data-language="csharp" aria-selected="false">C#</button>
    <button id="copyCodeBtn">Copy</button>
  `;
}

// ─────────────────────────────────────────
// CODE_EXAMPLES map
// ─────────────────────────────────────────
describe('CODE_EXAMPLES', () => {
  test('contains exactly javascript, python, java and csharp keys', () => {
    expect(Object.keys(CODE_EXAMPLES)).toEqual(['javascript', 'python', 'java', 'csharp']);
  });

  test('each entry has name, icon and code properties', () => {
    Object.values(CODE_EXAMPLES).forEach((example) => {
      expect(example).toHaveProperty('name');
      expect(example).toHaveProperty('icon');
      expect(example).toHaveProperty('code');
    });
  });
});

// ─────────────────────────────────────────
// initCodeDisplay
// ─────────────────────────────────────────
describe('initCodeDisplay', () => {
  beforeEach(setupDOM);

  test('renders initial javascript code block on init', () => {
    initCodeDisplay();
    const codeEl = document.querySelector('#codeDisplay code');
    expect(codeEl).not.toBeNull();
    expect(codeEl.className).toBe('language-javascript');
  });

  test('logs error and returns early when codeDisplay element is missing', () => {
    document.body.innerHTML = '';
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    initCodeDisplay();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  test('switching to python tab renders python code', () => {
    initCodeDisplay();
    document.querySelector('[data-language="python"]').click();
    expect(document.querySelector('#codeDisplay code').className).toBe('language-python');
  });

  test('switching tabs updates aria-selected correctly', () => {
    initCodeDisplay();
    const pythonTab = document.querySelector('[data-language="python"]');
    const jsTab = document.querySelector('[data-language="javascript"]');
    pythonTab.click();
    expect(pythonTab.getAttribute('aria-selected')).toBe('true');
    expect(jsTab.getAttribute('aria-selected')).toBe('false');
  });

  test('active class moves to clicked tab', () => {
    initCodeDisplay();
    const javaTab = document.querySelector('[data-language="java"]');
    javaTab.click();
    expect(javaTab.classList.contains('active')).toBe(true);
    expect(document.querySelector('[data-language="javascript"]').classList.contains('active')).toBe(false);
  });

  test('tab with invalid data-language value logs a warning and does not re-render', () => {
    // Add an extra tab with an unrecognised language before init so it gets a listener
    const badTab = document.createElement('button');
    badTab.setAttribute('data-language', 'cobol');
    document.body.appendChild(badTab);

    initCodeDisplay();

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    badTab.click();
    expect(warnSpy).toHaveBeenCalledWith(
      'Tab has invalid or missing data-language:',
      'cobol',
    );
    // codeDisplay was last rendered as javascript by initCodeDisplay
    expect(document.querySelector('#codeDisplay code').className).toBe('language-javascript');
    warnSpy.mockRestore();
  });

  test('tab with empty data-language value logs a warning and does not re-render', () => {
    const emptyTab = document.createElement('button');
    emptyTab.setAttribute('data-language', '');
    document.body.appendChild(emptyTab);

    initCodeDisplay();

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    emptyTab.click();
    expect(warnSpy).toHaveBeenCalled();
    expect(document.querySelector('#codeDisplay code').className).toBe('language-javascript');
    warnSpy.mockRestore();
  });

  test('works correctly when no copyCodeBtn is present', () => {
    document.getElementById('copyCodeBtn').remove();
    expect(() => initCodeDisplay()).not.toThrow();
  });
});

// ─────────────────────────────────────────
// copyCode
// ─────────────────────────────────────────
describe('copyCode', () => {
  let writeTextMock;

  beforeEach(() => {
    writeTextMock = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
      writable: true,
    });
  });

  test('calls clipboard.writeText with the correct code for a valid language', async () => {
    await copyCode('javascript');
    expect(writeTextMock).toHaveBeenCalledWith(CODE_EXAMPLES.javascript.code);
  });

  test('copies python code when language is python', async () => {
    await copyCode('python');
    expect(writeTextMock).toHaveBeenCalledWith(CODE_EXAMPLES.python.code);
  });

  test('logs error and does not call clipboard for an invalid language', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    copyCode('cobol');
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Invalid language:', 'cobol');
    errorSpy.mockRestore();
  });

  test('logs error when clipboard API is unavailable', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      configurable: true,
      writable: true,
    });
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    copyCode('javascript');
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Clipboard API not available');
    errorSpy.mockRestore();
  });

  test('logs error when clipboard.writeText is unavailable', () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {},
      configurable: true,
      writable: true,
    });
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    copyCode('javascript');
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith('Clipboard API not available');
    errorSpy.mockRestore();
  });

  test('handles clipboard write failure gracefully', async () => {
    writeTextMock.mockRejectedValue(new Error('Permission denied'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await copyCode('javascript');
    expect(errorSpy).toHaveBeenCalledWith('Failed to copy code:', expect.any(Error));
    errorSpy.mockRestore();
  });
});
