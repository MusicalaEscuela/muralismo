import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { storage } from "../firebase/firebase.client.js";

export function uploadSubmissionFile({ courseId, studentId, file, onProgress }) {
  return new Promise((resolve, reject) => {
    const safeName = file.name.replace(/[^\w.\-áéíóúÁÉÍÓÚñÑ]/g, "_");
    const path = `submissions/${courseId}/${studentId}/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, path);

    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type
    });

    task.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress?.(progress);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          path,
          url
        });
      }
    );
  });
}
