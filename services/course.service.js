import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firebase.client.js";
import { muralismoCourseSeed } from "../data/seed.js";

export async function getCourses() {
  const snap = await getDocs(collection(db, "courses"));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getCourse(courseId) {
  const ref = doc(db, "courses", courseId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getSessions(courseId) {
  const ref = collection(db, "courses", courseId, "sessions");
  const snap = await getDocs(query(ref, orderBy("order", "asc")));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getSession(courseId, sessionId) {
  const ref = doc(db, "courses", courseId, "sessions", sessionId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function getActivities(courseId, sessionId) {
  const ref = collection(db, "courses", courseId, "sessions", sessionId, "activities");
  const snap = await getDocs(ref);
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function seedBaseCourse() {
  const courseRef = doc(db, "courses", muralismoCourseSeed.id);
  const existingCourse = await getDoc(courseRef);
  const created = !existingCourse.exists();

  const batch = writeBatch(db);
  const { sessions, ...courseData } = muralismoCourseSeed;

  batch.set(courseRef, {
    ...courseData,
    ...(created ? { createdAt: serverTimestamp() } : {}),
    updatedAt: serverTimestamp()
  }, { merge: true });

  const seedSessionIds = new Set(sessions.map((session) => session.id));
  const existingSessionsSnap = await getDocs(collection(db, "courses", muralismoCourseSeed.id, "sessions"));

  existingSessionsSnap.docs.forEach((sessionDoc) => {
    if (!seedSessionIds.has(sessionDoc.id)) {
      batch.delete(sessionDoc.ref);
    }
  });

  for (const session of sessions) {
    const { activities, ...sessionData } = session;
    const sessionRef = doc(db, "courses", muralismoCourseSeed.id, "sessions", session.id);
    const existingSession = await getDoc(sessionRef);

    batch.set(sessionRef, {
      ...sessionData,
      archived: false,
      ...(existingSession.exists() ? {} : { createdAt: serverTimestamp() }),
      updatedAt: serverTimestamp()
    }, { merge: true });

    const seedActivityIds = new Set(activities.map((activity) => activity.id));
    const existingActivitiesSnap = await getDocs(
      collection(db, "courses", muralismoCourseSeed.id, "sessions", session.id, "activities")
    );

    existingActivitiesSnap.docs.forEach((activityDoc) => {
      if (!seedActivityIds.has(activityDoc.id)) {
        batch.delete(activityDoc.ref);
      }
    });

    for (const activity of activities) {
      const activityRef = doc(
        db,
        "courses",
        muralismoCourseSeed.id,
        "sessions",
        session.id,
        "activities",
        activity.id
      );
      const existingActivity = await getDoc(activityRef);

      batch.set(activityRef, {
        ...activity,
        archived: false,
        ...(existingActivity.exists() ? {} : { createdAt: serverTimestamp() }),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
  }

  await batch.commit();

  return {
    created,
    courseId: muralismoCourseSeed.id
  };
}
