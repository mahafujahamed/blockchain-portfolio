import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Admin } from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/jwt';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) return NextResponse.json({ error: 'Invalid login' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid login' }, { status: 401 });

  const token = signJwt({ id: admin._id, email: admin.email });

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, { httpOnly: true });

  return res;
}
