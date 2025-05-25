'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 dark:text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </motion.h2>

      <motion.form
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
        />
        <textarea
          rows={5}
          placeholder="Your Message"
          className="p-3 rounded bg-white dark:bg-gray-800 border dark:border-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}
