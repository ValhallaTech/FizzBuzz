// ============================================
// Toast Notifications Module
// ============================================

/**
 * Shows a toast notification.
 * @param {string} message  - Message to display
 * @param {'success'|'error'|'info'|'warning'} type - Toast type
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
export function showToast(message, type = 'info', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fb-toast-container';
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  // Update aria-live on every toast so errors always get 'assertive'
  container.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

  const toast = document.createElement('div');
  toast.className = `fb-toast fb-toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const icons = {
    success: 'fa-circle-check',
    error: 'fa-circle-exclamation',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
  };
  const icon = icons[type] || icons.info;

  const iconEl = document.createElement('i');
  iconEl.className = `fa-solid ${icon}`;
  iconEl.setAttribute('aria-hidden', 'true');

  const textEl = document.createElement('span');
  textEl.textContent = message;

  toast.appendChild(iconEl);
  toast.appendChild(textEl);
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
      if (container.children.length === 0 && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 300);
  }, duration);
}

/** Shows a success toast. */
export function showSuccess(message) {
  showToast(message, 'success');
}

/** Shows an error toast. */
export function showError(message) {
  showToast(message, 'error');
}

/** Shows an info toast. */
export function showInfo(message) {
  showToast(message, 'info');
}

/** Shows a warning toast. */
export function showWarning(message) {
  showToast(message, 'warning');
}
