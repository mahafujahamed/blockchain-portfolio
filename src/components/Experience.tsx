"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Blockchain Developer Intern",
    company: "TechNova",
    duration: "Jan 2023 - May 2023",
    description: "Worked on Ethereum smart contracts, dApp integrations, and gas optimization techniques."
  },
  {
    title: "Smart Contract Auditor",
    company: "SecureChain",
    duration: "Jun 2023 - Dec 2023",
    description: "Audited Solidity contracts, performed static analysis, and enhanced DeFi protocol security."
  },
  {
    title: "Full Stack Blockchain Engineer",
    company: "ChainVerse",
    duration: "Jan 2024 - Present",
    description: "Leading the development of decentralized applications using React, Next.js, Solidity, and Ethers.js."
  }
];

export default function Experience() {
  return (
    <section className="py-20 bg-[#0e0e0e] text-white" id="experience">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Experience
        </motion.h2>

        <div className="space-y-10 relative border-l border-gray-700 pl-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-3 top-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
              <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-400">{exp.company} — {exp.duration}</p>
                <p className="mt-2 text-gray-300">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
