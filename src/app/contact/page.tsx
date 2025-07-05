'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';  // Correct import

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const metadata = {
  title: 'Contact | Mahafuj Ahamed',
  description:
    'Get in touch with Mahafuj Ahamed, blockchain & web3 developer. Reach out for collaboration or inquiries.',
  keywords: ['Mahafuj Ahamed contact', 'blockchain developer contact', 'web3 developer', 'Next.js contact form'],
  openGraph: {
    title: 'Contact | Mahafuj Ahamed',
    description: 'Let’s connect! I’d love to hear about your blockchain project.',
    url: 'https://mahafujahamed.me/contact',
    siteName: 'Mahafuj Ahamed Portfolio',
    type: 'website',
    images: [
      {
        url: '/my-profile.png',
        width: 1200,
        height: 630,
        alt: 'Mahafuj Ahamed Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Mahafuj Ahamed',
    description: 'Reach out to Mahafuj Ahamed, a blockchain/web3 developer.',
    creator: '@devmahafuj',
    images: ['/my-profile.png'],
  },
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const recaptchaRef = useRef<ReCAPTCHA>(null); // ReCAPTCHA reference
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token }),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success('Message sent successfully!');
      reset();
    } else {
      toast.error(result?.error || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <section className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Your Name"
          {...register('name', { required: 'Name is required' })}
          className="w-full px-4 py-3 border rounded-md dark:bg-gray-900"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Your Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
          })}
          className="w-full px-4 py-3 border rounded-md dark:bg-gray-900"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <textarea
          rows={5}
          placeholder="Your Message"
          {...register('message', { required: 'Message is required' })}
          className="w-full px-4 py-3 border rounded-md dark:bg-gray-900"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

        {/* Invisible ReCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          size="invisible"
          ref={recaptchaRef}
        />

        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <Toaster position="top-center" />
    </section>
  );
}
