'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          I&apos;m a passionate Blockchain Developer specializing in smart contracts,
          decentralized applications (dApps), and Web3 integrations. I love building
          secure, scalable blockchain solutions and exploring the future of decentralized
          tech.
        </motion.p>
      </div>
    </section>
  );
}
