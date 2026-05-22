# Taller de muralismo

Aplicación web para estudiantes del curso **Taller de muralismo**, desarrollado por Musicala junto a Miguel Ángel Ballesteros Urrego.

La app está pensada para que los estudiantes avancen por sesiones, revisen el material visual del curso y realicen las actividades indicadas. No incluye módulo de entregas, botón de enviar actividad, espacio de reflexión ni sección de mis envíos.

## Contenido

- Presentación del curso.
- Ruta de 6 sesiones de muralismo.
- Material visual tomado de la guía en `assets/guia/`.
- PDF completo disponible para consulta.
- Actividades por sesión con lenguaje para estudiantes.
- Apartado de preparación de superficie en la sesión 4.
- Navegación entre sesiones.

## Uso local

Abre `index.html` con un servidor local. Por ejemplo:

```bash
python -m http.server 5500
```

Luego entra a:

```text
http://localhost:5500
```

## Configuración

La configuración de Firebase está en:

```text
src/firebase/firebase.config.js
```

Ajusta esos valores si el proyecto se conecta a otro Firebase.
