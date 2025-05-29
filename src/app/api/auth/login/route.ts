import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return NextResponse.json({ token });
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
