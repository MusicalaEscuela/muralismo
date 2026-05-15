import { html } from "../utils/dom.js";
import { navigate } from "../utils/router.js";

export function courseTemplate({ courses, selectedCourse, sessions, submissions }) {
  const course = selectedCourse || courses[0];
  if (!course) {
    return html`
      <section class="empty">
        <h3>No hay curso disponible</h3>
        <p>El curso no pudo cargarse desde la información local de la app.</p>
      </section>
    `;
  }

  const completedActivityIds = new Set(submissions.map((item) => item.activityId));

  return html`
    <section class="hero">
      <div class="hero-kicker">🤝 Musicala + Miguel Ángel Ballesteros</div>
      <h1>${course.title}</h1>
      <p>${course.description || ""}</p>
      <div class="hero-actions">
        <span class="badge green">🎨 ${sessions.length} sesiones</span>
        <span class="badge blue">👤 ${course.teacherName || "Miguel Ángel Ballesteros"}</span>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Ruta del curso</h2>
          <p>Avanza sesión por sesión y entrega las actividades de tu proceso creativo.</p>
        </div>
      </div>

      <div class="session-list">
        ${sessions.map((session) => {
          const isDone = completedActivityIds.has(`actividad-${String(session.order).padStart(2, "0")}`) ||
            [...completedActivityIds].some((id) => id.includes(`-${String(session.order).padStart(2, "0")}-`));

          return html`
            <article class="session-item">
              <div class="session-number">${session.order}</div>
              <div>
                <h3>${session.title}</h3>
                <p>${session.summary || ""}</p>
                <div class="course-meta">
                  <span class="badge">${session.duration || "Sesión"}</span>
                  ${isDone ? `<span class="badge green">✓ Con entrega</span>` : `<span class="badge amber">Pendiente</span>`}
                </div>
              </div>
              <button class="btn btn-primary" data-session="${session.id}" data-course="${course.id}">
                Abrir
              </button>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

export function bindCourseEvents() {
  document.querySelectorAll("[data-session]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`/sesion?courseId=${button.dataset.course}&sessionId=${button.dataset.session}`);
    });
  });
}
