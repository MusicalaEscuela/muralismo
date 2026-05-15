import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "../firebase/firebase.client.js";
import { ensureUserProfile } from "./user.service.js";

const provider = new GoogleAuthProvider();

export function listenAuth(callback) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null, null);
      return;
    }

    const profile = await ensureUserProfile(firebaseUser);
    callback(firebaseUser, profile);
  });
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return ensureUserProfile(result.user);
}

export async function logout() {
  await signOut(auth);
}
