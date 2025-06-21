'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/about.css';

const tabs = ['Bio', 'Experience', 'Education'];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('Bio');

  return (
    <div className="min-h-screen pt-24 px-4 md:px-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* --- About Hero Section --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 mb-16">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src="/my-profile.png" // Make sure this image exists in /public
            alt="Profile"
            width={450}
            height={450}
            className="rounded-lg shadow-lg object-cover"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-pink-600 font-semibold uppercase mb-2">
            Visit My Portfolio & Hire Me
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About Me</h1>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
            I&#39;m a passionate <strong className="text-pink-500">Blockchain Developer</strong> who
            builds smart contracts, DeFi protocols, and full-stack DApps using Solidity,
            TypeScript, and Next.js.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            My tech stack includes <strong>Solidity</strong>, <strong>Next.js</strong>,{' '}
            <strong>MongoDB</strong>, and <strong>Tailwind CSS</strong>. Always learning!
          </p>
          <Link
            href="/Mahafuj-Ahamed-CV.pdf"
            download
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition font-semibold text-sm"
          >
            Download My CV
          </Link>
        </motion.div>
      </section>

      {/* --- Tabs Section --- */}
      <div className="flex justify-center space-x-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- Tab Content --- */}
      <div className="text-lg dark:text-gray-300 mb-12">
        {activeTab === 'Bio' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            I&#39;m a passionate Blockchain Developer with expertise in building decentralized applications,
            smart contracts, and full-stack Web3 projects. My goal is to contribute to cutting-edge blockchain
            solutions and empower decentralization.
          </motion.p>
        )}

        {activeTab === 'Experience' && (
          <motion.ul
            className="timeline list-disc ml-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <li><span className="font-semibold">2024</span> – Intern at Chainlink Labs</li>
            <li><span className="font-semibold">2023</span> – Built DeFi staking DApp on Ethereum</li>
            <li><span className="font-semibold">2022</span> – Freelance Web3 Developer (Solidity & React)</li>
          </motion.ul>
        )}

        {activeTab === 'Education' && (
          <motion.ul
            className="timeline list-disc ml-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <li><span className="font-semibold">2022</span> – B.Sc in Computer Science</li>
            <li><span className="font-semibold">2021</span> – Solidity Bootcamp (Alchemy)</li>
          </motion.ul>
        )}
      </div>

      {/* --- Skills Section --- */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tech Skills</h2>
        {[
          { name: 'Solidity', value: 90 },
          { name: 'React.js / Next.js', value: 85 },
          { name: 'TypeScript', value: 80 },
          { name: 'MongoDB', value: 75 },
          { name: 'Tailwind CSS', value: 90 },
        ].map((skill) => (
          <div key={skill.name} className="mb-4">
            <div className="flex justify-between">
              <span>{skill.name}</span>
              <span>{skill.value}%</span>
            </div>
            <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill.value}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
