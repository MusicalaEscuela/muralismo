# Estructura Firestore

## users

```txt
users/{uid}
  name: string
  email: string
  photoURL: string
  role: "admin" | "teacher" | "student"
  createdAt: timestamp
  updatedAt: timestamp
```

## courses

```txt
courses/{courseId}
  title: string
  subtitle: string
  description: string
  credits: string
  teacherName: string
  partnerName: string
  status: "draft" | "published"
  coverImage: string
  createdAt: timestamp
  updatedAt: timestamp
```

## sessions

Subcolección:

```txt
courses/{courseId}/sessions/{sessionId}
  title: string
  summary: string
  order: number
  duration: string
  contentHtml: string
  videoUrl: string
  resourceLinks: array
  isPublished: boolean
  createdAt: timestamp
```

## activities

Subcolección:

```txt
courses/{courseId}/sessions/{sessionId}/activities/{activityId}
  title: string
  instructions: string
  type: "text" | "file" | "mixed"
  rubric: array
  dueDate: timestamp | null
```

## submissions

```txt
submissions/{submissionId}
  courseId: string
  sessionId: string
  activityId: string
  studentId: string
  studentName: string
  textResponse: string
  fileUrls: array
  status: "submitted" | "reviewed"
  feedback: string
  score: string
  createdAt: timestamp
  updatedAt: timestamp
```

## enrollments

```txt
enrollments/{courseId_uid}
  courseId: string
  studentId: string
  status: "active" | "completed" | "paused"
  createdAt: timestamp
```

## progress

```txt
progress/{courseId_uid}
  courseId: string
  studentId: string
  completedSessions: array
  completedActivities: array
  percentage: number
  lastAccess: timestamp
```
