import { html, escapeHtml, showToast } from "../utils/dom.js";
import { seedBaseCourse } from "../services/course.service.js";
import { reviewSubmission } from "../services/submission.service.js";
import { formatDateTime, statusLabel } from "../utils/formatters.js";
import { openModal, closeModal } from "./modal.ui.js";
import { navigate } from "../utils/router.js";

export function adminTemplate({ submissions }) {
  return html`
    <section class="hero">
      <div class="hero-kicker">🧭 Panel de revisión</div>
      <h1>Seguimiento del proceso</h1>
      <p>
        Revisa entregas, deja retroalimentación y actualiza el curso base cuando cambie la guía.
      </p>
      <div class="hero-actions">
        <button class="btn btn-secondary" id="seed-course">Actualizar curso base</button>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Entregas recibidas</h2>
          <p>Feedback claro, humano y útil. La santísima trinidad que internet suele olvidar.</p>
        </div>
      </div>

      ${submissions.length ? html`
        <table class="admin-table">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Sesión / Actividad</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${submissions.map((submission) => html`
              <tr>
                <td>
                  <strong>${escapeHtml(submission.studentName || "Estudiante")}</strong><br>
                  <span style="color:var(--muted)">${escapeHtml(submission.studentEmail || "")}</span>
                </td>
                <td>
                  <strong>${escapeHtml(submission.sessionTitle || "")}</strong><br>
                  <span style="color:var(--muted)">${escapeHtml(submission.activityTitle || "")}</span>
                </td>
                <td><span class="badge ${submission.status === "reviewed" ? "green" : "amber"}">${statusLabel(submission.status)}</span></td>
                <td>${formatDateTime(submission.createdAt)}</td>
                <td><button class="btn btn-ghost" data-review="${submission.id}">Revisar</button></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      ` : html`
        <div class="empty">
          <h3>No hay entregas todavía</h3>
          <p>Cuando los estudiantes envíen actividades, aparecerán aquí.</p>
        </div>
      `}
    </section>
  `;
}

export function bindAdminEvents({ submissions }) {
  document.querySelector("#seed-course")?.addEventListener("click", async () => {
    try {
      const result = await seedBaseCourse();
      showToast("Curso actualizado correctamente.");
      navigate(`/curso?courseId=${result.courseId}`);
    } catch (error) {
      console.error(error);
      showToast("No se pudo actualizar el curso. Revisa permisos.");
    }
  });

  document.querySelectorAll("[data-review]").forEach((button) => {
    const submission = submissions.find((item) => item.id === button.dataset.review);
    button.addEventListener("click", () => openReviewModal(submission));
  });
}

function openReviewModal(submission) {
  openModal(html`
    <div class="modal-header">
      <div>
        <h2>Revisar entrega</h2>
        <p style="color:var(--muted);margin:6px 0 0;">${escapeHtml(submission.studentName || "Estudiante")}</p>
      </div>
      <button class="icon-button" data-close-modal>×</button>
    </div>

    <div class="grid">
      <article class="card" style="box-shadow:none;">
        <h3>${escapeHtml(submission.activityTitle || "Actividad")}</h3>
        <p>${escapeHtml(submission.textResponse || "Sin respuesta escrita.")}</p>

        ${submission.fileUrls?.length ? html`
          <div class="resource-list">
            ${submission.fileUrls.map((file) => html`
              <div class="resource-item">
                <strong>${escapeHtml(file.name || "Archivo")}</strong>
                <a class="btn btn-ghost" href="${file.url}" target="_blank" rel="noopener">Abrir</a>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </article>

      <form class="form" id="review-form">
        <div class="form-row">
          <label for="score">Valoración</label>
          <select class="select" id="score" name="score">
            <option value="">Seleccionar</option>
            <option value="En exploración" ${submission.score === "En exploración" ? "selected" : ""}>En exploración</option>
            <option value="Buen avance" ${submission.score === "Buen avance" ? "selected" : ""}>Buen avance</option>
            <option value="Muy logrado" ${submission.score === "Muy logrado" ? "selected" : ""}>Muy logrado</option>
            <option value="Listo para siguiente fase" ${submission.score === "Listo para siguiente fase" ? "selected" : ""}>Listo para siguiente fase</option>
          </select>
        </div>

        <div class="form-row">
          <label for="feedback">Retroalimentación</label>
          <textarea class="textarea" id="feedback" name="feedback" placeholder="Escribe una retroalimentación clara y útil...">${escapeHtml(submission.feedback || "")}</textarea>
        </div>

        <button class="btn btn-primary" type="submit">Guardar retroalimentación</button>
      </form>
    </div>
  `);

  document.querySelector("[data-close-modal]")?.addEventListener("click", closeModal);

  document.querySelector("#review-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const feedback = document.querySelector("#feedback").value.trim();
    const score = document.querySelector("#score").value;

    try {
      await reviewSubmission(submission.id, { feedback, score });
      showToast("Retroalimentación guardada.");
      closeModal();
      navigate(`/admin?refresh=${Date.now()}`);
    } catch (error) {
      console.error(error);
      showToast("No se pudo guardar la retroalimentación.");
    }
  });
}
