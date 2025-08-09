// src/components/About.tsx

"use client";

import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="w-full py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg leading-8 text-center text-muted-foreground"
        >
          I’m a passionate <span className="text-primary font-medium">Blockchain Developer</span> with experience in building secure, decentralized applications using technologies like <span className="font-medium">Solidity, Web3.js, Ethers.js, Hardhat</span> and <span className="font-medium">Next.js</span>.  
          I thrive in fast-paced environments and love contributing to open-source blockchain projects.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
