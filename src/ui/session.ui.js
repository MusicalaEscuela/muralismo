
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
          <figure class="visual-card ${resource.layout === "wide" ? "visual-card-wide" : ""}">
            <img src="${resource.src}" alt="${resource.alt}" loading="lazy" />
            <figcaption>${resource.caption || resource.alt}</figcaption>
          </figure>
        `).join("")}
      </div>
    </article>
  `;
}

function finalDeliveryBlock(session) {
  if (!session.finalDelivery) return "";

  return html`
    <article class="lesson-block final-delivery-block">
      <div class="section-header guide-header">
        <div>
          <h3>Espacio para tu producto final</h3>
          <p>Aquí puedes dejar la imagen de tu mural terminado y una nota corta sobre tu proceso.</p>
        </div>
      </div>

      <form class="final-delivery-form" id="final-delivery-form">
        <div class="form-row">
          <label for="final-delivery-title">Nombre de la entrega</label>
          <input class="input" id="final-delivery-title" name="title" type="text" placeholder="Producto final del mural" />
        </div>

        <div class="form-row">
          <label for="final-delivery-note">Comentario del estudiante</label>
          <textarea class="textarea" id="final-delivery-note" name="note" placeholder="Puedes contar qué idea desarrollaste, qué aprendiste o cómo te sentiste durante el proceso."></textarea>
        </div>

        <div class="form-row">
          <label for="final-delivery-image">Imagen del mural final</label>
          <input class="input" id="final-delivery-image" name="image" type="file" accept="image/*" />
          <div class="file-drop">Sube una foto clara de tu mural terminado. Este espacio está pensado solo para la entrega final.</div>
        </div>

        <div class="final-delivery-preview is-empty" id="final-delivery-preview">
          <div class="final-delivery-preview-empty">Todavía no has cargado una imagen del producto final.</div>
          <img id="final-delivery-preview-image" alt="Vista previa del producto final" hidden />
        </div>

        <div class="final-delivery-actions">
          <button class="btn btn-primary" type="submit">Guardar entrega</button>
          <button class="btn btn-ghost" type="button" id="final-delivery-clear">Quitar imagen</button>
        </div>
      </form>
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
        ${navigation.next ? `<button class="btn btn-primary" data-go-session="${navigation.next.id}" type="button">${navigation.next.order === 0 ? "Presentación" : navigation.next.finalDelivery ? "Entrega final" : `Sesión ${navigation.next.order}`} →</button>` : ""}
      </div>
    </div>

    <section class="section session-page session-page-wide">
      <div class="lesson-content">
        <article class="lesson-block lesson-intro">
          <span class="badge">${session.order === 0 ? "Inicio" : session.finalDelivery ? "Cierre" : `Sesión ${session.order}`}</span>
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
        ${finalDeliveryBlock(session)}

        <div class="session-actions-bottom">
          ${navigation.previous ? `<button class="btn btn-ghost" data-go-session="${navigation.previous.id}" type="button">← Volver a ${navigation.previous.order === 0 ? "presentación" : navigation.previous.finalDelivery ? "entrega final" : `sesión ${navigation.previous.order}`}</button>` : ""}
          <button class="btn btn-ghost" id="back-course-bottom" type="button">Ver ruta del taller</button>
          ${navigation.next ? `<button class="btn btn-primary" data-go-session="${navigation.next.id}" type="button">Ir a ${navigation.next.order === 0 ? "presentación" : navigation.next.finalDelivery ? "entrega final" : `sesión ${navigation.next.order}`} →</button>` : ""}
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

export function bindSessionEvents({ course, session }) {
  const goCourse = () => navigate(`/curso?courseId=${course.id}`);

  document.querySelector("#back-course")?.addEventListener("click", goCourse);
  document.querySelector("#back-course-bottom")?.addEventListener("click", goCourse);

  document.querySelectorAll("[data-go-session]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`/sesion?courseId=${course.id}&sessionId=${button.dataset.goSession}`);
    });
  });

  if (session?.finalDelivery) {
    setupFinalDeliveryForm(course, session);
  }
}

function setupFinalDeliveryForm(course, session) {
  const form = document.querySelector("#final-delivery-form");
  if (!form) return;

  const titleInput = document.querySelector("#final-delivery-title");
  const noteInput = document.querySelector("#final-delivery-note");
  const imageInput = document.querySelector("#final-delivery-image");
  const preview = document.querySelector("#final-delivery-preview");
  const previewImage = document.querySelector("#final-delivery-preview-image");
  const clearButton = document.querySelector("#final-delivery-clear");
  const storageKey = `muralismo-final-delivery:${course.id}:${session.id}`;

  let savedImage = "";

  const renderPreview = (src) => {
    savedImage = src || "";
    if (src) {
      preview?.classList.remove("is-empty");
      previewImage.src = src;
      previewImage.hidden = false;
    } else {
      preview?.classList.add("is-empty");
      previewImage.removeAttribute("src");
      previewImage.hidden = true;
    }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (saved) {
      titleInput.value = saved.title || "Producto final del mural";
      noteInput.value = saved.note || "";
      renderPreview(saved.image || "");
    } else {
      titleInput.value = "Producto final del mural";
      renderPreview("");
    }
  } catch (error) {
    titleInput.value = "Producto final del mural";
    renderPreview("");
  }

  imageInput?.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => renderPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  });

  clearButton?.addEventListener("click", () => {
    imageInput.value = "";
    renderPreview("");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const payload = {
      title: titleInput.value?.trim() || "Producto final del mural",
      note: noteInput.value?.trim() || "",
      image: savedImage || ""
    };

    localStorage.setItem(storageKey, JSON.stringify(payload));
    window.alert("Tu entrega final quedó guardada en este dispositivo.");
  });
}
