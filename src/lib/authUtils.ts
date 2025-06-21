// src/lib/authUtils.ts

import { adminAuth } from './firebaseAdmin';

export async function verifyFirebaseAuth(token?: string | null): Promise<boolean> {
  if (!token) return false;

  try {
    await adminAuth.verifyIdToken(token);
    return true;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return false;
  }
}
