import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "../firebase/firebase.client.js";

export async function ensureUserProfile(firebaseUser) {
  const ref = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const profile = {
      name: firebaseUser.displayName || "Usuario Musicala",
      email: firebaseUser.email || "",
      photoURL: firebaseUser.photoURL || "",
      role: "student",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(ref, profile);
    return { id: firebaseUser.uid, ...profile };
  }

  return { id: snap.id, ...snap.data() };
}

export async function updateUserRole(userId, role) {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, {
    role,
    updatedAt: serverTimestamp()
  });
}
