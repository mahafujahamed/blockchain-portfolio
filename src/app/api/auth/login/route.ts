// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { adminAuth } from '@/lib/firebaseAdmin';
// import jwt from 'jsonwebtoken';

// export async function POST(req: Request) {
//   const { idToken } = await req.json();
//   try {
//     const decoded = await adminAuth.verifyIdToken(idToken);
//     const token = jwt.sign({ uid: decoded.uid, email: decoded.email }, process.env.JWT_SECRET!, {
//       expiresIn: '1h',
//     });
//     cookies().set('token', token, { httpOnly: true, path: '/' });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }
// }
