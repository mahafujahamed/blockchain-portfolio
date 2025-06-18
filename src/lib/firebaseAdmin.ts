import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function verifyIdToken(token: string) {
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    return decoded;
  } catch {
    return null;
  }
}
