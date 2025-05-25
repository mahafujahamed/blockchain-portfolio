'use client';

import { motion } from 'framer-motion';
import { skills } from '../../data/skills'; // ✅ fixed import
import PageWrapper from '@/components/PageWrapper';

export default function SkillsPage() {
  return (
    <PageWrapper>
      <section className="min-h-screen py-16 px-4 md:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold text-center mb-12">My Skills</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-lg font-medium">{skill.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <motion.div
                  className="bg-blue-600 h-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
