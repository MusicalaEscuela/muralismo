import { listenAuth } from "./services/auth.service.js";
import { getCourses, getCourse, getSessions, getSession } from "./services/course.service.js";
import { renderAuthPage } from "./ui/auth.ui.js";
import { renderLayout } from "./ui/layout.ui.js";
import { dashboardTemplate, bindDashboardEvents } from "./ui/dashboard.ui.js";
import { courseTemplate, bindCourseEvents } from "./ui/course.ui.js";
import { sessionTemplate, bindSessionEvents } from "./ui/session.ui.js";
import { getRoute, onRouteChange } from "./utils/router.js";
import { html, showToast } from "./utils/dom.js";

const state = {
  firebaseUser: null,
  profile: null
};

listenAuth(async (firebaseUser, profile) => {
  state.firebaseUser = firebaseUser;
  state.profile = profile;

  if (!firebaseUser) {
    renderAuthPage();
    return;
  }

  await renderCurrentRoute();
});

onRouteChange(() => {
  if (state.firebaseUser) renderCurrentRoute();
});

async function renderCurrentRoute() {
  const route = getRoute();

  try {
    if (route.path === "/") {
      await renderDashboard();
      return;
    }

    if (route.path === "/curso") {
      await renderCourse(route);
      return;
    }

    if (route.path === "/sesion") {
      await renderSession(route);
      return;
    }

    await renderDashboard();
  } catch (error) {
    console.error(error);
    showToast("Algo falló cargando la guía.");
    renderLayout({
      user: state.firebaseUser,
      profile: state.profile,
      activePath: route.path,
      content: html`
        <section class="empty">
          <h3>No se pudo cargar esta parte de la guía</h3>
          <p>Revisa la configuración de Firebase o la conexión.</p>
        </section>
      `
    });
  }
}

async function loadBaseData() {
  const courses = await getCourses();
  const selectedCourse = courses[0] || null;
  const sessions = selectedCourse ? await getSessions(selectedCourse.id) : [];

  return { courses, selectedCourse, sessions };
}

async function renderDashboard() {
  const data = await loadBaseData();

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/",
    content: dashboardTemplate({ ...data, profile: state.profile })
  });

  bindDashboardEvents();
}

async function renderCourse(route) {
  const courseId = route.params.get("courseId");
  const courses = await getCourses();
  const selectedCourse = courseId ? await getCourse(courseId) : courses[0];
  const sessions = selectedCourse ? await getSessions(selectedCourse.id) : [];

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/curso",
    content: courseTemplate({ courses, selectedCourse, sessions })
  });

  bindCourseEvents();
}

async function renderSession(route) {
  const courseId = route.params.get("courseId");
  const sessionId = route.params.get("sessionId");

  const course = courseId ? await getCourse(courseId) : null;
  const session = courseId && sessionId ? await getSession(courseId, sessionId) : null;
  const sessions = courseId ? await getSessions(courseId) : [];

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/curso",
    content: sessionTemplate({ course, session, sessions })
  });

  bindSessionEvents({ course });
}
