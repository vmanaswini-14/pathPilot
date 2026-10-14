import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StudentTryoutSession, PersonalizedRoadmap } from '../types';

// Initialize Firebase App & Firestore Database
const app = initializeApp(firebaseConfig);

// CRITICAL: getFirestore must pass firestoreDatabaseId per skill
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Firestore Error Logging Helper conforming to skill specs
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
  };
  console.warn('Firestore Notice:', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

// Test connection on boot per skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client appears offline.');
    }
  }
}
testConnection();

// User Progress Data Interface
export interface UserProgressDoc {
  userId: string;
  selectedCareerId: string;
  sessions: Record<string, StudentTryoutSession>;
  roadmap: PersonalizedRoadmap | null;
  checklist: Record<string, boolean>;
  updatedAt: string;
}

// Default guest explorer ID for unauthenticated persistence
export const GUEST_USER_ID = 'pathpilot_guest_explorer';

// Helper: Fetch user application progress from Firestore
export async function loadUserProgress(userId: string = GUEST_USER_ID): Promise<UserProgressDoc | null> {
  const progressRef = doc(db, 'users', userId, 'progress', 'current');
  try {
    const snap = await getDoc(progressRef);
    if (snap.exists()) {
      return snap.data() as UserProgressDoc;
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${userId}/progress/current`);
    return null;
  }
}

// Helper: Save user application progress to Firestore
export async function saveUserProgress(
  userId: string = GUEST_USER_ID,
  progress: Omit<UserProgressDoc, 'userId' | 'updatedAt'>
): Promise<void> {
  if (!userId) return;
  const progressRef = doc(db, 'users', userId, 'progress', 'current');
  try {
    await setDoc(progressRef, {
      userId,
      ...progress,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}/progress/current`);
  }
}
