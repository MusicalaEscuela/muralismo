export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export function html(strings, ...values) {
  return strings.reduce((acc, str, index) => {
    const value = values[index] ?? "";
    return acc + str + value;
  }, "");
}

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function setApp(content) {
  const app = $("#app");
  app.innerHTML = content;
}

export function showToast(message) {
  const root = $("#toast-root");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  root.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
  }, 2600);

  window.setTimeout(() => toast.remove(), 3200);
}

export function getFormData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

export function fileListToArray(fileList) {
  return Array.from(fileList || []);
}
