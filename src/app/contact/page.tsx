'use client';

import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Message sent!');
        reset();
      } else {
        toast.error('Failed to send message.');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 mt-16">
      <Toaster />
      <motion.h1
        className="text-3xl font-bold mb-6 text-center dark:text-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register('name', { required: true })}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Your Email"
            {...register('email', { required: true })}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        <div>
          <textarea
            rows={5}
            placeholder="Your Message"
            {...register('message', { required: true })}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
