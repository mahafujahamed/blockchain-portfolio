'use client';

import { motion } from 'framer-motion';
import { FaEthereum, FaReact, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiSolidity, SiTailwindcss, SiTypescript, SiNextdotjs, SiMongodb } from 'react-icons/si';

const skills = [
  { name: 'Solidity', icon: <SiSolidity size={40} /> },
  { name: 'Ethereum', icon: <FaEthereum size={40} /> },
  { name: 'React', icon: <FaReact size={40} /> },
  { name: 'Next.js', icon: <SiNextdotjs size={40} /> },
  { name: 'Node.js', icon: <FaNodeJs size={40} /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} /> },
  { name: 'TypeScript', icon: <SiTypescript size={40} /> },
  { name: 'MongoDB', icon: <SiMongodb size={40} /> },
  { name: 'Git', icon: <FaGitAlt size={40} /> },
  { name: 'Docker', icon: <FaDocker size={40} /> },
];

export default function Skills() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Skills & Tech Stack
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-gray-800 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-2">{skill.icon}</div>
              <p className="text-sm font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
