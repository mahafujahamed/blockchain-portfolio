'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'DeFi Dapp',
    description: 'A decentralized finance application using Solidity and Web3.js.',
    image: '/projects/project1.png',
  },
  {
    title: 'NFT Marketplace',
    description: 'A blockchain-based marketplace for buying and selling NFTs.',
    image: '/projects/project2.png',
  },
];

export default function ProjectsPage() {
  return (
    <section className="min-h-screen py-16 px-4 md:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-center mb-12">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
