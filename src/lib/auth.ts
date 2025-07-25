import { getAuth } from 'firebase-admin/auth';
import { NextRequest } from 'next/server';
import { firebaseAdmin } from './firebaseAdmin';

export async function verifyAuthToken(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split('Bearer ')[1];
  try {
    const decoded = await getAuth(firebaseAdmin).verifyIdToken(token);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
