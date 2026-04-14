import { showToast, showSuccess, showError, showInfo, showWarning } from '../js/toast.js';

beforeEach(() => {
  document.body.innerHTML = '';
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('showToast', () => {
  test('creates a toast container and toast element', () => {
    showToast('Hello world', 'info');
    expect(document.getElementById('toast-container')).not.toBeNull();
    expect(document.querySelector('.fb-toast')).not.toBeNull();
  });

  test('toast text content matches message', () => {
    showToast('Test message', 'success');
    const toast = document.querySelector('.fb-toast');
    expect(toast.textContent).toContain('Test message');
  });

  test('applies the correct type class', () => {
    showToast('Error!', 'error');
    expect(document.querySelector('.fb-toast-error')).not.toBeNull();
  });

  test('shows the toast (adds .show class) after 10ms', () => {
    showToast('Hello', 'info');
    jest.advanceTimersByTime(10);
    expect(document.querySelector('.fb-toast').classList.contains('show')).toBe(true);
  });

  test('removes toast and container after duration + fade', () => {
    showToast('Bye', 'info', 1000);
    jest.advanceTimersByTime(10);    // show animation
    jest.advanceTimersByTime(1000);  // hide animation triggered
    jest.advanceTimersByTime(300);   // fade-out complete
    expect(document.getElementById('toast-container')).toBeNull();
  });

  test('container has aria-live="polite" for non-error types', () => {
    showToast('Info message', 'info');
    expect(document.getElementById('toast-container').getAttribute('aria-live')).toBe('polite');
  });

  test('updates aria-live to "assertive" when an error toast is added to an existing container', () => {
    showToast('Info first', 'info');
    expect(document.getElementById('toast-container').getAttribute('aria-live')).toBe('polite');
    showToast('Error next', 'error');
    expect(document.getElementById('toast-container').getAttribute('aria-live')).toBe('assertive');
  });

  test('error toast has role="alert"', () => {
    showToast('Error!', 'error');
    expect(document.querySelector('.fb-toast-error').getAttribute('role')).toBe('alert');
  });

  test('non-error toast has role="status"', () => {
    showToast('Info!', 'info');
    expect(document.querySelector('.fb-toast-info').getAttribute('role')).toBe('status');
  });
});

describe('convenience helpers', () => {
  test('showSuccess creates a fb-toast-success element', () => {
    showSuccess('Done!');
    expect(document.querySelector('.fb-toast-success')).not.toBeNull();
  });

  test('showError creates a fb-toast-error element', () => {
    showError('Oops!');
    expect(document.querySelector('.fb-toast-error')).not.toBeNull();
  });

  test('showInfo creates a fb-toast-info element', () => {
    showInfo('FYI');
    expect(document.querySelector('.fb-toast-info')).not.toBeNull();
  });

  test('showWarning creates a fb-toast-warning element', () => {
    showWarning('Watch out!');
    expect(document.querySelector('.fb-toast-warning')).not.toBeNull();
  });
});
