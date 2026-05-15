import { listenAuth } from "./services/auth.service.js";
import { getCourses, getCourse, getSessions, getSession, getActivities } from "./services/course.service.js";
import { getAllSubmissions, getMySubmissions, getSubmissionsByActivity } from "./services/submission.service.js";
import { renderAuthPage } from "./ui/auth.ui.js";
import { renderLayout } from "./ui/layout.ui.js";
import { dashboardTemplate, bindDashboardEvents } from "./ui/dashboard.ui.js";
import { courseTemplate, bindCourseEvents } from "./ui/course.ui.js";
import { sessionTemplate, bindSessionEvents } from "./ui/session.ui.js";
import { adminTemplate, bindAdminEvents } from "./ui/admin.ui.js";
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
      await renderDashboard(route);
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

    if (route.path === "/entregas") {
      await renderMySubmissions(route);
      return;
    }

    if (route.path === "/admin") {
      await renderAdmin(route);
      return;
    }

    await renderDashboard(route);
  } catch (error) {
    console.error(error);
    showToast("Algo falló cargando la información.");
    renderLayout({
      user: state.firebaseUser,
      profile: state.profile,
      activePath: route.path,
      content: html`
        <section class="empty">
          <h3>No se pudo cargar esta sección</h3>
          <p>Revisa la configuración de Firebase, reglas o conexión.</p>
        </section>
      `
    });
  }
}

async function loadBaseData() {
  const courses = await getCourses();
  const selectedCourse = courses[0] || null;
  const sessions = selectedCourse ? await getSessions(selectedCourse.id) : [];
  const submissions = state.firebaseUser
    ? await getMySubmissions(state.firebaseUser.uid, selectedCourse?.id || null)
    : [];

  return { courses, selectedCourse, sessions, submissions };
}

async function renderDashboard(route) {
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
  const submissions = selectedCourse
    ? await getMySubmissions(state.firebaseUser.uid, selectedCourse.id)
    : [];

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/curso",
    content: courseTemplate({ courses, selectedCourse, sessions, submissions })
  });

  bindCourseEvents();
}

async function renderSession(route) {
  const courseId = route.params.get("courseId");
  const sessionId = route.params.get("sessionId");

  const course = courseId ? await getCourse(courseId) : null;
  const session = courseId && sessionId ? await getSession(courseId, sessionId) : null;
  const activities = courseId && sessionId ? await getActivities(courseId, sessionId) : [];
  const mySubmissions = activities[0]
    ? await getSubmissionsByActivity(activities[0].id, state.firebaseUser.uid)
    : [];

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/curso",
    content: sessionTemplate({ course, session, activities, mySubmissions })
  });

  bindSessionEvents({
    course,
    session,
    activities,
    user: state.firebaseUser
  });
}

async function renderMySubmissions(route) {
  const submissions = await getMySubmissions(state.firebaseUser.uid);

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/entregas",
    content: html`
      <section class="hero">
        <div class="hero-kicker">🗂️ Portafolio creativo</div>
        <h1>Mis entregas</h1>
        <p>Aquí se va construyendo el registro de tu proceso: ideas, referentes, bocetos, evidencias y reflexiones.</p>
      </section>

      <section class="section">
        <div class="submission-list">
          ${submissions.length ? submissions.map((submission) => html`
            <article class="card">
              <div class="section-header">
                <div>
                  <h3>${submission.activityTitle || "Actividad"}</h3>
                  <p>${submission.sessionTitle || ""}</p>
                </div>
                <span class="badge ${submission.status === "reviewed" ? "green" : "amber"}">
                  ${submission.status === "reviewed" ? "Revisado" : "Enviado"}
                </span>
              </div>
              <p>${submission.textResponse || ""}</p>
              ${submission.feedback ? `<div class="feedback"><strong>Feedback:</strong><br>${submission.feedback}</div>` : ""}
              <div class="course-meta">
                <span class="badge">${submission.fileUrls?.length || 0} archivos</span>
                ${submission.score ? `<span class="badge green">${submission.score}</span>` : ""}
              </div>
            </article>
          `).join("") : html`
            <div class="empty">
              <h3>No tienes entregas todavía</h3>
              <p>Cuando envíes actividades, aparecerán aquí como portafolio.</p>
            </div>
          `}
        </div>
      </section>
    `
  });
}

async function renderAdmin(route) {
  if (!["admin", "teacher"].includes(state.profile.role)) {
    renderLayout({
      user: state.firebaseUser,
      profile: state.profile,
      activePath: "/",
      content: html`
        <section class="empty">
          <h3>No tienes acceso a esta sección</h3>
          <p>Este panel es para Musicala y profes del curso.</p>
        </section>
      `
    });
    return;
  }

  const submissions = await getAllSubmissions();

  renderLayout({
    user: state.firebaseUser,
    profile: state.profile,
    activePath: "/admin",
    content: adminTemplate({ submissions })
  });

  bindAdminEvents({ submissions });
}
