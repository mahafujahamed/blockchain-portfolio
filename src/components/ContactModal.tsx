'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';

type FormData = { name: string; email: string; message: string };

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const token = await recaptchaRef.current?.executeAsync();
    recaptchaRef.current?.reset();

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, token }),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success('Message sent!');
      reset();
      setIsOpen(false); // Close modal after success
    } else {
      toast.error(result?.error || 'Something went wrong');
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        Contact Me
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">Contact Me</Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Required' })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
            />
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: 'Required' })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
            />
            <textarea
              placeholder="Message"
              {...register('message', { required: 'Required' })}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800"
              rows={4}
            />
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="invisible"
              ref={recaptchaRef}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
