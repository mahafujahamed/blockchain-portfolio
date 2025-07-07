'use client';

import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

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
      toast.success('Message sent successfully!');
      reset();
      setIsOpen(false);
    } else {
      toast.error(result?.error || 'Something went wrong');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Let’s Talk
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white dark:bg-gray-900 p-8 max-w-lg w-full rounded-xl shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-4 text-center">Contact Me</Dialog.Title>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:text-white"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <input
                type="email"
                placeholder="Your Email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
                })}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:text-white"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

              <textarea
                rows={4}
                placeholder="Your Message"
                {...register('message', { required: 'Message is required' })}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:text-white"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                size="invisible"
                ref={(el) => {
                  recaptchaRef.current = el;
                }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Toaster position="top-center" />
    </>
  );
}
