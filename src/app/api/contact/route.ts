import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import clientPromise from '@/lib/mongodb';

export const runtime = 'nodejs'; // Ensure Node.js runtime for this API

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Captcha token missing' }, { status: 400 });
    }

    // ✅ Verify reCAPTCHA
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const captchaResult = await verifyRes.json();

    if (!captchaResult.success) {
      return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 });
    }

    // ✅ Save to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('contacts');

    const userIp = req.headers.get('x-forwarded-for') || 'Unknown IP';
    const userAgent = req.headers.get('user-agent') || 'Unknown Agent';

    await collection.insertOne({
      name,
      email,
      message,
      ip: userIp,
      userAgent,
      createdAt: new Date(),
    });

    // ✅ Send Email via Resend
    await resend.emails.send({
      from: 'Portfolio <noreply@mahafujahamed.me>',
      to: [
        'mahafujahamed068@gmail.com',
        'mahafujahamed990@gmail.com', // Add more recipients here
      ],
      subject: `New Contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\nIP: ${userIp}\nAgent: ${userAgent}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
