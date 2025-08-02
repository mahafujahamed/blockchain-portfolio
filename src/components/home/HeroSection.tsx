"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold">Mahafuj Ahamed</h1>
      <p className="text-xl text-gray-600">Blockchain Developer & Web3 Engineer</p>
      <a
        href="/Mahafuj_Ahamed_Resume.pdf"
        className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Download Resume
      </a>
    </motion.section>
  );
}
