import { html, setApp } from "../utils/dom.js";
import { logout } from "../services/auth.service.js";
import { navigate } from "../utils/router.js";
import { roleLabel } from "../utils/formatters.js";

const navItems = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/curso", label: "Ruta del taller", icon: "🎨" }
];

export function renderLayout({ user, profile, activePath, content }) {
  setApp(html`
    <div class="layout">
      <div class="sidebar-backdrop" id="sidebar-backdrop" aria-hidden="true"></div>

      <aside class="sidebar" id="sidebar" aria-label="Menú del taller">
        <div class="brand">
          <img src="./assets/logo-placeholder.svg" alt="Musicala" />
          <div>
            <div class="brand-title">Taller de muralismo</div>
            <div class="brand-subtitle">Musicala + Miguel Ángel Ballesteros Urrego</div>
          </div>
        </div>

        <nav class="nav">
          ${navItems.map((item) => html`
            <button class="${activePath === item.path ? "is-active" : ""}" data-route="${item.path}" type="button">
              <span>${item.icon}</span>
              <span>${item.label}</span>
            </button>
          `).join("")}
        </nav>

        <div class="sidebar-card">
          <h3>Para estudiantes</h3>
          <p>
            Avanza sesión por sesión. Lee las explicaciones, observa las imágenes y realiza las tareas indicadas.
          </p>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="btn btn-ghost mobile-menu" id="mobile-menu" type="button" aria-controls="sidebar" aria-expanded="false">☰ Menú</button>
          <div></div>
          <div class="user-pill">
            <img src="${user.photoURL || "./assets/favicon.svg"}" alt="${profile?.name || user.displayName || "Usuario"}" />
            <div>
              <strong>${profile?.name || user.displayName || "Estudiante"}</strong>
              <span>${roleLabel(profile.role)}</span>
            </div>
            <button class="icon-button" id="logout-btn" type="button" title="Cerrar sesión">↗</button>
          </div>
        </header>

        <div class="page">
          ${content}
        </div>
      </main>
    </div>
  `);

  const sidebar = document.querySelector("#sidebar");
  const backdrop = document.querySelector("#sidebar-backdrop");
  const menuButton = document.querySelector("#mobile-menu");

  const setMenuOpen = (isOpen) => {
    sidebar?.classList.toggle("is-open", isOpen);
    backdrop?.classList.toggle("is-visible", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton?.setAttribute("aria-expanded", String(isOpen));
  };

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(button.dataset.route);
      setMenuOpen(false);
    });
  });

  document.querySelector("#logout-btn")?.addEventListener("click", logout);

  menuButton?.addEventListener("click", () => {
    setMenuOpen(!sidebar?.classList.contains("is-open"));
  });

  backdrop?.addEventListener("click", () => setMenuOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}
