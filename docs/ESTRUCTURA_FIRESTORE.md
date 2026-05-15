# Estructura Firestore

El contenido del curso no se guarda en Firestore. Las sesiones y actividades viven directamente en `src/data/seed.js`.

## users

```txt
users/{uid}
  name: string
  email: string
  photoURL: string
  role: "student"
  createdAt: timestamp
  updatedAt: timestamp
```

## submissions

```txt
submissions/{submissionId}
  courseId: string
  courseTitle: string
  sessionId: string
  sessionTitle: string
  activityId: string
  activityTitle: string
  studentId: string
  studentName: string
  studentEmail: string
  textResponse: string
  status: "submitted" | "reviewed"
  feedback: string
  score: string
  createdAt: timestamp
  updatedAt: timestamp
```
