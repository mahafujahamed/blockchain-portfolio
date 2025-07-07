import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Verify reCAPTCHA
    const captchaVerify = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const captchaResult = await captchaVerify.json();
    if (!captchaResult.success) {
      return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Mahafuj Contact <noreply@mahafujahamed.me>',
      to: ['mahafujahamed068@gmail.com'], // 🔁 replace with your real email
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
