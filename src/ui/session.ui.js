import { html } from "../utils/dom.js";
import { navigate } from "../utils/router.js";

function getSessionNavigation(sessions = [], currentSession) {
  const ordered = [...sessions].sort((a, b) => a.order - b.order);
  const currentIndex = ordered.findIndex((item) => item.id === currentSession?.id);

  return {
    previous: currentIndex > 0 ? ordered[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < ordered.length - 1 ? ordered[currentIndex + 1] : null
  };
}

function materialList(course, session) {
  if (!session.showMaterials || !course.materials?.length) return "";

  return html`
    <article class="lesson-block">
      <div class="section-header guide-header">
        <div>
          <h3>Materiales</h3>
          <p>Tenlos listos para trabajar mejor durante el taller.</p>
        </div>
      </div>
      <ul class="material-list single-column-materials">
        ${course.materials.map((material) => `<li>${material}</li>`).join("")}
      </ul>
    </article>
  `;
}

function visualResources(session) {
  if (!session.visualResources?.length) return "";

  return html`
    <article class="lesson-block">
      <div class="section-header guide-header">
        <div>
          <h3>Imágenes de apoyo</h3>
          <p>Observa estas imágenes de la guía. La explicación está escrita arriba para que puedas leerla con más claridad.</p>
        </div>
      </div>

      <div class="visual-grid">
        ${session.visualResources.map((resource) => html`
          <figure class="visual-card">
            <img src="${resource.src}" alt="${resource.alt}" loading="lazy" />
            <figcaption>${resource.caption || resource.alt}</figcaption>
          </figure>
        `).join("")}
      </div>
    </article>
  `;
}

export function sessionTemplate({ course, session, sessions = [] }) {
  if (!course || !session) {
    return html`
      <section class="empty">
        <h3>No encontramos esta sesión</h3>
        <p>Vuelve a la ruta del taller e intenta abrir una sesión disponible.</p>
      </section>
    `;
  }

  const navigation = getSessionNavigation(sessions, session);

  return html`
    <div class="session-actions-top">
      <button class="btn btn-ghost" id="back-course" type="button">← Volver a la ruta</button>
      <div class="session-nav-actions">
        ${navigation.previous ? `<button class="btn btn-ghost" data-go-session="${navigation.previous.id}" type="button">← ${navigation.previous.order === 0 ? "Presentación" : `Sesión ${navigation.previous.order}`}</button>` : ""}
        ${navigation.next ? `<button class="btn btn-primary" data-go-session="${navigation.next.id}" type="button">${navigation.next.order === 0 ? "Presentación" : `Sesión ${navigation.next.order}`} →</button>` : ""}
      </div>
    </div>

    <section class="section session-page session-page-wide">
      <div class="lesson-content">
        <article class="lesson-block lesson-intro">
          <span class="badge">${session.order === 0 ? "Inicio" : `Sesión ${session.order}`}</span>
          <h2>${session.title}</h2>
          <p>${session.summary || ""}</p>
        </article>

        ${session.lessonSections?.length ? html`
          <article class="lesson-block">
            <div class="section-header guide-header">
              <div>
                <h3>Lee antes de trabajar</h3>
                <p>Esta explicación te ayuda a entender qué harás en esta parte del taller.</p>
              </div>
            </div>
            <div class="lesson-section-list">
              ${session.lessonSections.map((section) => html`
                <div class="lesson-section-item">
                  <h4>${section.title}</h4>
                  <p>${section.body}</p>
                </div>
              `).join("")}
            </div>
          </article>
        ` : ""}

        ${materialList(course, session)}
        ${visualResources(session)}

        <div class="session-actions-bottom">
          ${navigation.previous ? `<button class="btn btn-ghost" data-go-session="${navigation.previous.id}" type="button">← Volver a ${navigation.previous.order === 0 ? "presentación" : `sesión ${navigation.previous.order}`}</button>` : ""}
          <button class="btn btn-ghost" id="back-course-bottom" type="button">Ver ruta del taller</button>
          ${navigation.next ? `<button class="btn btn-primary" data-go-session="${navigation.next.id}" type="button">Ir a ${navigation.next.order === 0 ? "presentación" : `sesión ${navigation.next.order}`} →</button>` : ""}
        </div>
      </div>

      <aside class="card activity-card task-card">
        <h3>${session.tasksTitle || "Tu tarea"}</h3>
        <p>${session.tasksIntro || "Realiza esto en tu proceso creativo y llévalo para revisarlo durante la clase."}</p>
        ${session.tasks?.length ? html`
          <ol class="task-list">
            ${session.tasks.map((task) => `<li>${task}</li>`).join("")}
          </ol>
        ` : html`
          <p>Lee el material de la sesión y sigue las instrucciones indicadas.</p>
        `}

        ${session.resourceLinks?.length ? html`
          <div class="task-resources">
            <h3>Recursos</h3>
            <div class="resource-list">
              ${session.resourceLinks.map((resource) => html`
                <div class="resource-item">
                  <strong>${resource.label}</strong>
                  <a class="btn btn-ghost" href="${resource.url}" target="_blank" rel="noopener">Abrir</a>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        ${course.guidePdf ? html`
          <div class="task-resources">
            <h3>Guía completa</h3>
            <div class="resource-list">
              <div class="resource-item">
                <strong>PDF del taller</strong>
                <a class="btn btn-ghost" href="${course.guidePdf}" target="_blank" rel="noopener">Abrir</a>
              </div>
            </div>
          </div>
        ` : ""}
      </aside>
    </section>
  `;
}

export function bindSessionEvents({ course }) {
  const goCourse = () => navigate(`/curso?courseId=${course.id}`);

  document.querySelector("#back-course")?.addEventListener("click", goCourse);
  document.querySelector("#back-course-bottom")?.addEventListener("click", goCourse);

  document.querySelectorAll("[data-go-session]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`/sesion?courseId=${course.id}&sessionId=${button.dataset.goSession}`);
    });
  });
}
