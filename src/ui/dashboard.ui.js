import { html } from "../utils/dom.js";
import { percent } from "../utils/formatters.js";
import { navigate } from "../utils/router.js";

export function dashboardTemplate({ courses, sessions, submissions, profile }) {
  const totalSessions = sessions.length;
  const completedActivityIds = new Set(submissions.map((item) => item.activityId));
  const completed = Math.min(completedActivityIds.size, totalSessions);
  const progress = percent(completed, totalSessions);

  return html`
    <section class="hero">
      <div class="hero-kicker">🎨 Laboratorio creativo</div>
      <h1>Muralismo Vivo</h1>
      <p>
        Del concepto al muro: una experiencia para pensar, bocetar, narrar y construir
        propuestas murales con sentido artístico y social.
      </p>
      <div class="hero-actions">
        <button class="btn btn-secondary" id="go-course">Ver curso</button>
        <button class="btn btn-light" id="go-submissions">Mis entregas</button>
      </div>
    </section>

    <section class="section grid grid-3">
      <article class="card stat-card">
        <div class="stat-value">${totalSessions}</div>
        <div class="stat-label">Sesiones del curso</div>
      </article>
      <article class="card stat-card">
        <div class="stat-value">${submissions.length}</div>
        <div class="stat-label">Entregas realizadas</div>
      </article>
      <article class="card stat-card">
        <div class="stat-value">${progress}%</div>
        <div class="stat-label">Avance estimado</div>
        <div class="progress-bar" style="--progress:${progress}%"><span></span></div>
      </article>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Curso activo</h2>
          <p>Trabajo conjunto entre Musicala y Miguel Ángel Ballesteros.</p>
        </div>
      </div>

      ${courses.length ? courses.map((course) => html`
        <article class="card course-card">
          <div class="course-cover"></div>
          <div>
            <h3>${course.title}: ${course.subtitle || ""}</h3>
            <p>${course.description || ""}</p>
            <div class="course-meta">
              <span class="badge">🎨 ${sessions.length} sesiones</span>
              <span class="badge blue">👤 ${course.teacherName || "Miguel Ángel Ballesteros"}</span>
              <span class="badge green">🤝 Musicala</span>
            </div>
            <button class="btn btn-primary" data-course="${course.id}">Entrar al curso</button>
          </div>
        </article>
      `).join("") : html`
        <div class="empty">
          <h3>No pudimos mostrar el curso</h3>
          <p>Revisa que la información local del curso esté disponible.</p>
        </div>
      `}
    </section>
  `;
}

export function bindDashboardEvents() {
  document.querySelector("#go-course")?.addEventListener("click", () => navigate("/curso"));
  document.querySelector("#go-submissions")?.addEventListener("click", () => navigate("/entregas"));

  document.querySelectorAll("[data-course]").forEach((button) => {
    button.addEventListener("click", () => navigate(`/curso?courseId=${button.dataset.course}`));
  });
}
