// app/api/auth/set-token/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();
  cookies().set('token', token, { httpOnly: true, path: '/' });
  return NextResponse.json({ success: true });
}
