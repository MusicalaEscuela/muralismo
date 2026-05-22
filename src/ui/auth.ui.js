import { html, setApp } from "../utils/dom.js";
import { loginWithGoogle } from "../services/auth.service.js";
import { showToast } from "../utils/dom.js";

export function renderAuthPage() {
  setApp(html`
    <main class="auth-page">
      <section class="auth-visual">
        <div class="hero-kicker">🎨 Musicala + Miguel Ángel Ballesteros Urrego</div>
        <h1>Taller de muralismo</h1>
        <p>
          Vas a recorrer una guía práctica para crear un mural: idea, mensaje, referentes, boceto, composición, color, materiales, retícula y pintura final.
        </p>
        <p>
          Entra para ver las sesiones, revisar el material visual del curso y seguir las actividades indicadas.
        </p>
      </section>

      <section class="auth-card">
        <div class="auth-card-inner card">
          <img src="./assets/logo-placeholder.svg" alt="Musicala" />
          <h2>Ingresar al taller</h2>
          <p>
            Usa tu cuenta de Google para entrar al Taller de muralismo.
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
