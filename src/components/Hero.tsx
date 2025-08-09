"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, MoveRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-between px-8 md:px-16 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <div className="max-w-2xl space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          I’m <span className="text-blue-500">Mahafuj Ahamed</span>,<br />a
          Blockchain Developer.
        </motion.h1>

        <motion.p
          className="text-lg text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I build secure, scalable Web3 applications using smart contracts,
          Solidity, and full-stack JavaScript. Let’s push the boundaries of
          decentralization.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button size="lg">
            <a href="#contact">
              Contact Me <MoveRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="secondary" size="lg">
            <a href="https://github.com/mahafujahamed" target="_blank">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Image
          src="/my-profile.png"
          alt="Profile"
          width={400}
          height={400}
          className="rounded-full border-4 border-blue-500 shadow-lg"
        />
      </motion.div>
    </section>
  );
}
