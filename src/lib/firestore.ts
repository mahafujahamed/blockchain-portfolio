import { db } from './firebaseAdmin';

export const getPosts = async () => {
  const snap = await db.collection('posts').orderBy('createdAt', 'desc').get();
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPostById = async (id: string) => {
  const doc = await db.collection('posts').doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const createPost = async (data: any) => {
  const now = new Date().toISOString();
  const res = await db.collection('posts').add({ ...data, createdAt: now, updatedAt: now });
  return res.id;
};

export const updatePost = async (id: string, data: any) => {
  await db.collection('posts').doc(id).update({ ...data, updatedAt: new Date().toISOString() });
};

export const deletePost = async (id: string) => {
  await db.collection('posts').doc(id).delete();
};
