import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    if (!name || !email || !message || !token) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ✅ reCAPTCHA validation
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${token}`,
    });

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // ✅ Send Email via Resend
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mahafuj Ahamed <onboarding@resend.dev>',
        to: ['mahafujahamed068@gmail.com', 'yourother@example.com'],
        subject: `New Contact from ${name}`,
        reply_to: email, // ✅ Correct field
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      }),
    });

    if (!emailRes.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
