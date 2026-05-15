import { muralismoCourseSeed } from "../data/seed.js";

export async function getCourses() {
  return [courseFromSeed()];
}

export async function getCourse(courseId) {
  if (!courseId || courseId === muralismoCourseSeed.id) return courseFromSeed();
  return null;
}

export async function getSessions(courseId) {
  if (courseId !== muralismoCourseSeed.id) return [];
  return muralismoCourseSeed.sessions
    .filter((session) => session.isPublished)
    .map(({ activities, ...session }) => ({ ...session }))
    .sort((a, b) => a.order - b.order);
}

export async function getSession(courseId, sessionId) {
  if (courseId !== muralismoCourseSeed.id) return null;

  const session = muralismoCourseSeed.sessions.find((item) => item.id === sessionId);
  if (!session || !session.isPublished) return null;

  const { activities, ...sessionData } = session;
  return { ...sessionData };
}

export async function getActivities(courseId, sessionId) {
  if (courseId !== muralismoCourseSeed.id) return [];

  const session = muralismoCourseSeed.sessions.find((item) => item.id === sessionId);
  return session?.activities?.map((activity) => ({ ...activity })) || [];
}

function courseFromSeed() {
  const { sessions, ...courseData } = muralismoCourseSeed;
  return { ...courseData };
}
