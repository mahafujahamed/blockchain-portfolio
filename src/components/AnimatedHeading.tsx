"use client";

import { motion } from "framer-motion";

export function AnimatedHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      className="text-3xl font-bold mb-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.h1>
  );
}
