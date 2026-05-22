# Estructura Firestore

La app puede funcionar con datos locales desde `src/data/seed.js`. Si se conecta a Firebase, la estructura sugerida es:

```text
courses/{courseId}
sessions/{sessionId}
users/{userId}
```

En esta versión no hay colección de entregas porque la plataforma quedó enfocada en consultar la guía, revisar imágenes y trabajar las actividades durante clase.
