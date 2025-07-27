// src/lib/verifyToken.ts
import { cookies } from 'next/headers';
import { adminAuth } from './firebaseAdmin';

export const verifyToken = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');

  if (!tokenCookie?.value) {
    throw new Error('Unauthorized: No token found');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(tokenCookie.value);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Unauthorized: Invalid token');
  }
};
