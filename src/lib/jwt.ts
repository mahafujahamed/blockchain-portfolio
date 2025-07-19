import jwt from 'jsonwebtoken';

export const runtime = 'nodejs'; // ✅ Fix for Edge Runtime error

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
