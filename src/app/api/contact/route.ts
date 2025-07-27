import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { connectDB } from '@/lib/mongoose';
import mongoose from 'mongoose';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Define Contact schema inline or import from models
const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    ip: String,
    userAgent: String,
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

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

    // ✅ Connect to MongoDB and insert
    await connectDB();

    const ip = req.headers.get('x-forwarded-for') || 'Unknown IP';
    const userAgent = req.headers.get('user-agent') || 'Unknown Agent';

    await Contact.create({
      name,
      email,
      message,
      ip,
      userAgent,
    });

    // ✅ Send email via Resend
    await resend.emails.send({
      from: 'Portfolio <noreply@mahafujahamed.me>',
      to: ['mahafujahamed068@gmail.com', 'mahafujahamed990@gmail.com'],
      subject: `New Contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}\nIP: ${ip}\nAgent: ${userAgent}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
