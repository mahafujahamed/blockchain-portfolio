// src/lib/verifyToken.ts
'use server'; // ✅ REQUIRED FOR SERVER CONTEXT

import { cookies } from 'next/headers';
import { adminAuth } from './firebaseAdmin';

export const verifyToken = async () => {
  const cookieStore = await cookies(); // ✅ NOT async
  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized: No token found in cookies');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid or expired token');
  }
};
