export function formatDate(value) {
  if (!value) return "Sin fecha";
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(date);
}

export function formatDateTime(value) {
  if (!value) return "Sin fecha";
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function percent(completed, total) {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
}

export function roleLabel(role) {
  const labels = {
    admin: "Admin",
    teacher: "Profe",
    student: "Estudiante"
  };
  return labels[role] || "Estudiante";
}

export function statusLabel(status) {
  const labels = {
    submitted: "Enviado",
    reviewed: "Revisado",
    active: "Activo",
    completed: "Completado",
    paused: "Pausado"
  };
  return labels[status] || status || "Sin estado";
}
