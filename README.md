# Muralismo Vivo

Plataforma web para un curso/laboratorio de muralismo desarrollado como trabajo conjunto entre **Musicala** y **Miguel Ángel Ballesteros**.

La app permite crear un curso por sesiones, subir recursos, recibir entregas de estudiantes, dejar retroalimentación y construir un portafolio creativo.

## Qué incluye

- Landing interna con identidad clara del proyecto.
- Login con Google usando Firebase Auth.
- Roles: `admin`, `teacher`, `student`.
- Panel de estudiante.
- Curso base de muralismo con sesiones precargadas.
- Actividades por sesión.
- Entrega de evidencias con texto y archivos.
- Panel de revisión para profes/admin.
- Retroalimentación por entrega.
- Firestore rules.
- Storage rules.
- Manifest PWA básico.
- Datos semilla en `src/data/seed.js`.

## Estructura

```txt
muralismo-vivo-musicala/
  index.html
  styles.css
  manifest.webmanifest
  firebase.json
  firestore.rules
  storage.rules
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
      storage.service.js
      user.service.js
    ui/
      layout.ui.js
      auth.ui.js
      dashboard.ui.js
      course.ui.js
      session.ui.js
      admin.ui.js
      modal.ui.js
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
2. Activa:
   - Authentication > Google
   - Firestore Database
   - Storage
3. Copia la configuración web de Firebase.
4. Pégala en:

```js
src/firebase/firebase.config.js
```

5. Publica las reglas:

```bash
firebase deploy --only firestore:rules,storage
```

6. Sube la app a Firebase Hosting o GitHub Pages.

## Primer admin

Por seguridad, la app crea cualquier usuario nuevo como `student`.

Después del primer login, cambia el rol manualmente en Firestore:

```txt
users/{uid}/role = "admin"
```

También puedes usar:

```txt
role = "teacher"
```

## Créditos sugeridos

Usar este texto en la plataforma:

> Un laboratorio creativo desarrollado como trabajo conjunto entre Musicala y Miguel Ángel Ballesteros.

Este crédito mantiene clara la autoría conjunta entre Musicala y Miguel Ángel Ballesteros.

## Nota

Este proyecto está listo como MVP funcional, pero antes de producción conviene revisar roles, reglas y límites de subida según el número real de estudiantes.
