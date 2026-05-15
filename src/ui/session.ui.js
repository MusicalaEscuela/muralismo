import { html, escapeHtml, showToast } from "../utils/dom.js";
import { createSubmission, getSubmissionsByActivity } from "../services/submission.service.js";
import { navigate } from "../utils/router.js";
import { formatDateTime, statusLabel } from "../utils/formatters.js";

export function sessionTemplate({ course, session, activities, mySubmissions }) {
  if (!course || !session) {
    return html`
      <section class="empty">
        <h3>No encontramos esta sesión</h3>
        <p>Vuelve al curso e intenta abrir una sesión disponible.</p>
      </section>
    `;
  }

  const activity = activities[0];

  return html`
    <button class="btn btn-ghost" id="back-course">← Volver al curso</button>

    <section class="section session-page">
      <div class="lesson-content">
        <article class="lesson-block">
          <span class="badge">Sesión ${session.order}</span>
          <h2>${session.title}</h2>
          <p>${session.summary || ""}</p>
        </article>

        <article class="lesson-block">
          ${session.videoUrl ? html`
            <div class="video-frame">
              <iframe src="${session.videoUrl}" allowfullscreen title="Video de la sesión"></iframe>
            </div>
          ` : html`
            <div class="video-frame">
              <div>
                <h3>Video pendiente</h3>
                <p>Aquí se podrá insertar el video de la sesión cuando el profe lo suba.</p>
              </div>
            </div>
          `}
        </article>

        <article class="lesson-block">
          ${session.contentHtml || "<p>Contenido pendiente.</p>"}
        </article>

        ${session.resourceLinks?.length ? html`
          <article class="lesson-block">
            <h3>Recursos</h3>
            <div class="resource-list">
              ${session.resourceLinks.map((resource) => html`
                <div class="resource-item">
                  <strong>${resource.label}</strong>
                  <a class="btn btn-ghost" href="${resource.url}" target="_blank" rel="noopener">Abrir</a>
                </div>
              `).join("")}
            </div>
          </article>
        ` : ""}
      </div>

      <aside class="card activity-card">
        ${activity ? activityTemplate({ course, session, activity, mySubmissions }) : html`
          <h3>Actividad pendiente</h3>
          <p>Esta sesión aún no tiene actividad.</p>
        `}
      </aside>
    </section>
  `;
}

function activityTemplate({ course, session, activity, mySubmissions }) {
  return html`
    <h3>${activity.title}</h3>
    <p>${activity.instructions || ""}</p>

    ${activity.rubric?.length ? html`
      <div class="course-meta">
        ${activity.rubric.map((item) => `<span class="badge">${item}</span>`).join("")}
      </div>
    ` : ""}

    <form class="form" id="submission-form">
      <div class="form-row">
        <label for="textResponse">Respuesta o reflexión</label>
        <textarea class="textarea" id="textResponse" name="textResponse" placeholder="Escribe aquí tu proceso, idea, explicación o reflexión..."></textarea>
      </div>

      <button class="btn btn-primary" type="submit">
        Enviar actividad
      </button>
    </form>

    <hr style="border:0;border-top:1px solid var(--border);margin:20px 0;" />

    <h3>Mis envíos</h3>
    <div class="submission-list">
      ${mySubmissions.length ? mySubmissions.map((submission) => html`
        <article class="submission-item">
          <div>
            <strong>${statusLabel(submission.status)}</strong>
            <p>${formatDateTime(submission.createdAt)}</p>
            ${submission.feedback ? `<div class="feedback">${escapeHtml(submission.feedback)}</div>` : ""}
          </div>
          <span class="badge">Respuesta enviada</span>
        </article>
      `).join("") : html`
        <div class="empty">
          <h3>Aún no has enviado esta actividad</h3>
          <p>Tranquilo, el muro no se va a pintar solo. Bueno, ojalá.</p>
        </div>
      `}
    </div>
  `;
}

export function bindSessionEvents({ course, session, activities, user }) {
  document.querySelector("#back-course")?.addEventListener("click", () => {
    navigate(`/curso?courseId=${course.id}`);
  });

  const form = document.querySelector("#submission-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const activity = activities[0];
    if (!activity) return;

    const button = form.querySelector("button[type='submit']");
    const textResponse = document.querySelector("#textResponse").value.trim();

    if (!textResponse) {
      showToast("Escribe tu respuesta antes de enviar.");
      return;
    }

    button.disabled = true;
    button.textContent = "Enviando...";

    try {
      await createSubmission({
        courseId: course.id,
        courseTitle: course.title,
        sessionId: session.id,
        sessionTitle: session.title,
        activityId: activity.id,
        activityTitle: activity.title,
        studentId: user.uid,
        studentName: user.displayName || user.email,
        studentEmail: user.email,
        textResponse
      });

      showToast("Actividad enviada.");
      navigate(`/sesion?courseId=${course.id}&sessionId=${session.id}&refresh=${Date.now()}`);
    } catch (error) {
      console.error(error);
      showToast("No se pudo enviar la actividad.");
    } finally {
      button.disabled = false;
      button.textContent = "Enviar actividad";
    }
  });
}
