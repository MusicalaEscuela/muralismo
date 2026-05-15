# Muralismo Vivo

Plataforma web para un curso/laboratorio de muralismo desarrollado como trabajo conjunto entre **Musicala** y **Miguel Ángel Ballesteros**.

La app permite que cada estudiante ingrese, vea el curso, avance por las sesiones y envíe respuestas escritas de sus actividades. El contenido del curso vive directamente en `src/data/seed.js`; no requiere cargar ni actualizar un curso base desde un panel administrativo.

## Qué incluye

- Login con Google usando Firebase Auth.
- Panel de estudiante.
- Curso de muralismo embebido en la app.
- Sesiones 1 y 2 tomadas de la guía actualizada.
- Actividades por sesión.
- Entregas escritas guardadas en Firestore.
- Firestore rules.
- Manifest PWA básico.

## Estructura

```txt
muralismo-vivo-musicala/
  index.html
  styles.css
  manifest.webmanifest
  firebase.json
  firestore.rules
  assets/
  src/
    app.js
    firebase/
      firebase.config.js
      firebase.client.js
    data/
      seed.js
    services/
      auth.service.js
      course.service.js
      submission.service.js
      user.service.js
    ui/
      layout.ui.js
      auth.ui.js
      dashboard.ui.js
      course.ui.js
      session.ui.js
    utils/
      dom.js
      formatters.js
      router.js
  docs/
    IMPLEMENTACION.md
    ESTRUCTURA_FIRESTORE.md
```

## Configuración rápida

1. Crea un proyecto en Firebase.
2. Activa Authentication > Google.
3. Crea Firestore Database.
4. Copia la configuración web de Firebase en `src/firebase/firebase.config.js`.
5. Publica las reglas:

```bash
firebase deploy --only firestore:rules
```

6. Sube la app a Firebase Hosting o GitHub Pages.

## Créditos

Usar este texto en la plataforma:

> Un laboratorio creativo desarrollado como trabajo conjunto entre Musicala y Miguel Ángel Ballesteros.
