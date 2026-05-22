import { html } from "../utils/dom.js";
import { navigate } from "../utils/router.js";

export function dashboardTemplate({ courses, sessions }) {
  const course = courses[0];
  const presentation = sessions.find((session) => session.order === 0);
  const firstSession = sessions.find((session) => session.order === 1);

  return html`
    <section class="hero hero-clean">
      <div class="hero-kicker">🎨 Taller práctico</div>
      <h1>${course?.title || "Taller de muralismo"}</h1>
      <div class="hero-actions">
        ${presentation ? `<button class="btn btn-secondary" id="go-presentation" data-course="${course.id}" data-session="${presentation.id}" type="button">Presentación del taller</button>` : ""}
        <button class="btn btn-light" id="go-course" type="button">Ver ruta del taller</button>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Empieza por aquí</h2>
          <p>Abre la presentación y luego avanza por las sesiones en orden.</p>
        </div>
      </div>

      <div class="start-grid">
        ${presentation ? html`
          <article class="card start-card">
            <div class="start-icon">★</div>
            <h3>Presentación del taller</h3>
            <p>Conoce el objetivo, los temas principales y los materiales que vas a necesitar.</p>
            <button class="btn btn-primary" data-session="${presentation.id}" data-course="${course.id}" type="button">Abrir presentación</button>
          </article>
        ` : ""}

        ${firstSession ? html`
          <article class="card start-card">
            <div class="start-icon">1</div>
            <h3>Primera sesión</h3>
            <p>Empieza con la idea central, el mensaje, los referentes y tu boceto inicial.</p>
            <button class="btn btn-ghost" data-session="${firstSession.id}" data-course="${course.id}" type="button">Ir a sesión 1</button>
          </article>
        ` : ""}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Ruta del taller</h2>
          <p>Revisa cada sesión, observa las imágenes de apoyo y realiza la tarea indicada.</p>
        </div>
      </div>

      ${course ? html`
        <article class="card course-card compact-course-card">
          <div class="course-cover"></div>
          <div>
            <h3>${course.title}</h3>
            <div class="course-meta">
              <span class="badge blue">👤 ${course.teacherName || "Miguel Ángel Ballesteros Urrego"}</span>
              <span class="badge green">🤝 Musicala</span>
            </div>
            <button class="btn btn-primary" data-course-route="${course.id}" type="button">Ver todas las sesiones</button>
          </div>
        </article>
      ` : html`
        <div class="empty">
          <h3>No pudimos mostrar el taller</h3>
          <p>Revisa que la información local esté disponible.</p>
        </div>
      `}
    </section>
  `;
}

export function bindDashboardEvents() {
  document.querySelector("#go-course")?.addEventListener("click", () => navigate("/curso"));

  document.querySelector("#go-presentation")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    navigate(`/sesion?courseId=${button.dataset.course}&sessionId=${button.dataset.session}`);
  });

  document.querySelectorAll("[data-course-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(`/curso?courseId=${button.dataset.courseRoute}`));
  });

  document.querySelectorAll("[data-session]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`/sesion?courseId=${button.dataset.course}&sessionId=${button.dataset.session}`);
    });
  });
}
