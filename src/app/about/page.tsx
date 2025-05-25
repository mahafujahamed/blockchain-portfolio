'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import '@/styles/about.css';

const tabs = ['Bio', 'Experience', 'Education'];

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('Bio');

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center dark:text-white"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
       <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary dark:border-primary-light shadow-md">
            <Image
              src="/profile/profile.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg leading-relaxed">
              I'm a passionate <strong className="text-primary">Blockchain Developer</strong> who
              builds smart contracts, DeFi protocols, and full-stack DApps using Solidity,
              TypeScript, and Next.js.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              My tech stack includes <strong>Solidity</strong>, <strong>Next.js</strong>,{' '}
              <strong>MongoDB</strong>, and <strong>Tailwind CSS</strong>. Always learning!
            </p>
          </div>
        </div>
      </motion.h1>

      

      {/* Tabs */}
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

      {/* Tab content */}
      <div className="text-lg dark:text-gray-300">
        {activeTab === 'Bio' && (
          <motion.p
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            I'm a passionate Blockchain Developer with expertise in building decentralized applications,
            smart contracts, and full-stack Web3 projects. My goal is to contribute to cutting-edge blockchain solutions and empower decentralization.
          </motion.p>
        )}

        {activeTab === 'Experience' && (
          <motion.ul
            className="timeline"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <li><span>2024</span> - Intern at Chainlink Labs</li>
            <li><span>2023</span> - Built DeFi staking DApp on Ethereum</li>
            <li><span>2022</span> - Freelance Web3 Developer (Solidity & React)</li>
          </motion.ul>
        )}

        {activeTab === 'Education' && (
          <motion.ul
            className="timeline"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4 }}
          >
            <li><span>2022</span> - B.Sc in Computer Science</li>
            <li><span>2021</span> - Solidity Bootcamp (Alchemy)</li>
          </motion.ul>
        )}
      </div>

      {/* Skills */}
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
