import { html, setApp } from "../utils/dom.js";
import { logout } from "../services/auth.service.js";
import { navigate } from "../utils/router.js";
import { roleLabel } from "../utils/formatters.js";

const navItems = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/curso", label: "Curso", icon: "🎨" },
  { path: "/entregas", label: "Mis entregas", icon: "🗂️" }
];

export function renderLayout({ user, profile, activePath, content }) {
  const availableNav = navItems;

  setApp(html`
    <div class="layout">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <img src="./assets/logo-placeholder.svg" alt="Musicala" />
          <div>
            <div class="brand-title">Muralismo Vivo</div>
            <div class="brand-subtitle">Musicala + Miguel Ángel Ballesteros</div>
          </div>
        </div>

        <nav class="nav">
          ${availableNav.map((item) => html`
            <button class="${activePath === item.path ? "is-active" : ""}" data-route="${item.path}">
              <span>${item.icon}</span>
              <span>${item.label}</span>
            </button>
          `).join("")}
        </nav>

        <div class="sidebar-card">
          <h3>Trabajo conjunto</h3>
          <p>
            Plataforma creada para acompañar sesiones, entregas y portafolios del laboratorio de muralismo.
          </p>
        </div>
      </aside>

      <main class="main">
        <header class="topbar">
          <button class="btn btn-ghost mobile-menu" id="mobile-menu">☰ Menú</button>
          <div></div>
          <div class="user-pill">
            <img src="${user.photoURL || "./assets/favicon.svg"}" alt="${user.displayName || "Usuario"}" />
            <div>
              <strong>${user.displayName || profile.name || "Usuario"}</strong>
              <span>${roleLabel(profile.role)}</span>
            </div>
            <button class="icon-button" id="logout-btn" title="Cerrar sesión">↗</button>
          </div>
        </header>

        <div class="page">
          ${content}
        </div>
      </main>
    </div>
  `);

  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(button.dataset.route);
      document.querySelector("#sidebar").classList.remove("is-open");
    });
  });

  document.querySelector("#logout-btn").addEventListener("click", logout);

  document.querySelector("#mobile-menu")?.addEventListener("click", () => {
    document.querySelector("#sidebar").classList.toggle("is-open");
  });
}
