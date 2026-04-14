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
    expect(document.querySelector('.toast')).not.toBeNull();
  });

  test('toast text content matches message', () => {
    showToast('Test message', 'success');
    const toast = document.querySelector('.toast');
    expect(toast.textContent).toContain('Test message');
  });

  test('applies the correct type class', () => {
    showToast('Error!', 'error');
    expect(document.querySelector('.toast-error')).not.toBeNull();
  });

  test('shows the toast (adds .show class) after 10ms', () => {
    showToast('Hello', 'info');
    jest.advanceTimersByTime(10);
    expect(document.querySelector('.toast').classList.contains('show')).toBe(true);
  });

  test('removes toast and container after duration + fade', () => {
    showToast('Bye', 'info', 1000);
    jest.advanceTimersByTime(10);    // show animation
    jest.advanceTimersByTime(1000);  // hide animation triggered
    jest.advanceTimersByTime(300);   // fade-out complete
    expect(document.getElementById('toast-container')).toBeNull();
  });
});

describe('convenience helpers', () => {
  test('showSuccess creates a toast-success element', () => {
    showSuccess('Done!');
    expect(document.querySelector('.toast-success')).not.toBeNull();
  });

  test('showError creates a toast-error element', () => {
    showError('Oops!');
    expect(document.querySelector('.toast-error')).not.toBeNull();
  });

  test('showInfo creates a toast-info element', () => {
    showInfo('FYI');
    expect(document.querySelector('.toast-info')).not.toBeNull();
  });

  test('showWarning creates a toast-warning element', () => {
    showWarning('Watch out!');
    expect(document.querySelector('.toast-warning')).not.toBeNull();
  });
});
