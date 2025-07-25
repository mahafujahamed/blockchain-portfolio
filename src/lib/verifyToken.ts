'use server';

import { cookies as getCookies } from 'next/headers';
import { adminAuth } from './firebaseAdmin';

export const verifyToken = async () => {
  const cookieStore = getCookies(); // ✅ avoid naming conflict
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized: No token found in cookies');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (err) {
    console.error('Token verification failed:', err instanceof Error ? err.message : err);
    throw new Error('Unauthorized: Invalid token');
  }
};
