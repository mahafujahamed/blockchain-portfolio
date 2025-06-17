// src/lib/authUtils.ts
import admin from 'firebase-admin';
import { NextRequest } from 'next/server';

export async function verifyJWT(token: string | undefined) {
  if (!token) return null;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}
