// src/components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I'm <span className="text-blue-500">Mahafuj Ahamed</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A passionate <span className="text-blue-400">Blockchain Developer</span> specializing in Web3, Smart Contracts & dApps.
        </p>
        <a
          href="#contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default Hero;
