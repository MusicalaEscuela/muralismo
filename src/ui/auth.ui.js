import { html, setApp } from "../utils/dom.js";
import { loginWithGoogle } from "../services/auth.service.js";
import { showToast } from "../utils/dom.js";

export function renderAuthPage() {
  setApp(html`
    <main class="auth-page">
      <section class="auth-visual">
        <div class="hero-kicker">🎨 Musicala + Miguel Ángel Ballesteros</div>
        <h1>Muralismo Vivo</h1>
        <p>
          Un laboratorio creativo para transformar ideas, símbolos, memoria y territorio
          en propuestas murales con narrativa visual.
        </p>
        <p>
          Este proyecto se desarrolla como trabajo conjunto entre Musicala y Miguel Ángel Ballesteros.
        </p>
      </section>

      <section class="auth-card">
        <div class="auth-card-inner card">
          <img src="./assets/logo-placeholder.svg" alt="Musicala" />
          <h2>Ingresar al curso</h2>
          <p>
            Entra con tu cuenta de Google para ver sesiones, entregar actividades y construir tu portafolio creativo.
          </p>
          <button class="btn btn-primary" id="login-btn">Ingresar con Google</button>
        </div>
      </section>
    </main>
  `);

  document.querySelector("#login-btn").addEventListener("click", async () => {
    try {
      await loginWithGoogle();
      showToast("Sesión iniciada.");
    } catch (error) {
      console.error(error);
      showToast("No se pudo iniciar sesión.");
    }
  });
}
