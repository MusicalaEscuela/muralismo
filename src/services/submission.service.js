import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firebase.client.js";

export async function createSubmission(data) {
  const ref = await addDoc(collection(db, "submissions"), {
    ...data,
    status: "submitted",
    feedback: "",
    score: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return ref.id;
}

export async function getMySubmissions(studentId, courseId = null) {
  const constraints = [where("studentId", "==", studentId), orderBy("createdAt", "desc")];
  if (courseId) constraints.unshift(where("courseId", "==", courseId));

  const snap = await getDocs(query(collection(db, "submissions"), ...constraints));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getSubmissionsByActivity(activityId, studentId = null) {
  const constraints = [where("activityId", "==", activityId), orderBy("createdAt", "desc")];
  if (studentId) constraints.unshift(where("studentId", "==", studentId));

  const snap = await getDocs(query(collection(db, "submissions"), ...constraints));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function getAllSubmissions() {
  const snap = await getDocs(query(collection(db, "submissions"), orderBy("createdAt", "desc")));
  return snap.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function reviewSubmission(submissionId, { feedback, score }) {
  const ref = doc(db, "submissions", submissionId);
  await updateDoc(ref, {
    feedback,
    score,
    status: "reviewed",
    updatedAt: serverTimestamp()
  });
}
