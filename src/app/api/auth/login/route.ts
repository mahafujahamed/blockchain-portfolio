export const runtime = 'nodejs'; // ✅ Force Node.js runtime

import { NextResponse } from 'next/server';
import { signJwt } from '@/lib/jwt';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = signJwt({ email });

    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
    });

    return res;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
