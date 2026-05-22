import { html } from "../utils/dom.js";
import { navigate } from "../utils/router.js";

export function courseTemplate({ courses, selectedCourse, sessions }) {
  const course = selectedCourse || courses[0];
  if (!course) {
    return html`
      <section class="empty">
        <h3>No hay taller disponible</h3>
        <p>El taller no pudo cargarse desde la información local de la app.</p>
      </section>
    `;
  }

  const presentation = sessions.find((session) => session.order === 0);

  return html`
    <section class="hero hero-clean">
      <div class="hero-kicker">🤝 Musicala + ${course.teacherName || "Miguel Ángel Ballesteros Urrego"}</div>
      <h1>${course.title}</h1>
      <div class="hero-actions">
        ${presentation ? `<button class="btn btn-secondary" data-session="${presentation.id}" data-course="${course.id}" type="button">Presentación del taller</button>` : ""}
        ${course.guidePdf ? `<a class="btn btn-light" href="${course.guidePdf}" target="_blank" rel="noopener">Abrir PDF completo</a>` : ""}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Ruta del taller</h2>
          <p>Abre cada sesión, lee la explicación, revisa las imágenes de apoyo y realiza la actividad indicada.</p>
        </div>
      </div>

      <div class="session-list">
        ${sessions.map((session) => html`
          <article class="session-item">
            <div class="session-number">${session.order === 0 ? "★" : session.order}</div>
            <div>
              <h3>${session.title}</h3>
              <p>${session.summary || ""}</p>
              <div class="course-meta">
                <span class="badge">${session.duration || "Sesión"}</span>
                ${session.visualResources?.length ? `<span class="badge blue">Imágenes de apoyo</span>` : ""}
              </div>
            </div>
            <button class="btn btn-primary" data-session="${session.id}" data-course="${course.id}" type="button">
              Abrir
            </button>
          </article>
        `).join("")}
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
