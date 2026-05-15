# Implementación del proyecto

## 1. Crear Firebase

En Firebase Console:

- Crear proyecto.
- Registrar una app web.
- Activar Google Auth.
- Crear Firestore en modo producción.
- Crear Storage.

## 2. Configurar la app

Editar:

```txt
src/firebase/firebase.config.js
```

y reemplazar los valores por los de su proyecto.

## 3. Publicar reglas

Desde la terminal:

```bash
firebase login
firebase init
firebase deploy --only firestore:rules,storage
```

Si ya tienen Firebase CLI configurado, basta con:

```bash
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 4. Cargar datos semilla

La app trae datos base en `src/data/seed.js`.

La primera vez que entra un admin o teacher puede usar el botón:

```txt
Cargar curso base
```

Esto crea el curso de muralismo, sesiones y actividades en Firestore.

## 5. Roles recomendados

- `admin`: Alek, Cata o directivos Musicala.
- `teacher`: Miguel Ángel Ballesteros u otros docentes invitados.
- `student`: estudiantes del curso.

## 6. Publicación

### Firebase Hosting

```bash
firebase deploy --only hosting
```

### GitHub Pages

También puede funcionar como sitio estático si se sube todo el contenido a un repo.

Recomendación: para proyectos con Auth + Storage, Firebase Hosting suele dar menos dolores de cabeza. Ya suficiente tenemos con existir.
