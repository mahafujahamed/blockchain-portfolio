'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'NFT Marketplace',
    description: 'A decentralized NFT platform built with Solidity, Next.js, and IPFS.',
    image: '/projects/nft-marketplace.png',
    link: 'https://github.com/yourname/nft-marketplace',
  },
  {
    title: 'DeFi Staking App',
    description: 'Smart contract-based staking platform for ERC-20 tokens.',
    image: '/projects/defi-staking.png',
    link: 'https://github.com/yourname/defi-staking',
  },
  {
    title: 'DAO Voting System',
    description: 'On-chain voting app using Solidity and Snapshot integration.',
    image: '/projects/dao-voting.png',
    link: 'https://github.com/yourname/dao-voting',
  },
];

export default function Projects() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
