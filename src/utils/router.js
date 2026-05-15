const listeners = new Set();

export function navigate(hash) {
  if (window.location.hash === hash) {
    notify();
    return;
  }
  window.location.hash = hash;
}

export function getRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  const [path, queryString = ""] = hash.split("?");
  const params = new URLSearchParams(queryString);
  return {
    path: path || "/",
    params
  };
}

export function onRouteChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notify() {
  const route = getRoute();
  listeners.forEach((callback) => callback(route));
}

window.addEventListener("hashchange", notify);
