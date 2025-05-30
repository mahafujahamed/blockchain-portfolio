import { db } from './firebaseAdmin';

export const getPosts = async () => {
  const snapshot = await db.collection('posts').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPostById = async (id: string) => {
  const doc = await db.collection('posts').doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const createPost = async (data: any) => {
  const docRef = await db.collection('posts').add(data);
  return docRef.id;
};

export const updatePost = async (id: string, data: any) => {
  await db.collection('posts').doc(id).update(data);
};

export const deletePost = async (id: string) => {
  await db.collection('posts').doc(id).delete();
};
