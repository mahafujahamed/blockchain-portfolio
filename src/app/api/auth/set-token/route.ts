// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// export const dynamic = 'force-dynamic';

// export async function POST(req: Request) {
//   const { token } = await req.json();

//   cookies().set('token', token, {
//     httpOnly: true,
//     path: '/',
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 60 * 60 * 24, // 1 day
//   });

//   return NextResponse.json({ success: true });
// }
