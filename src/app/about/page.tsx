import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About – Mahafuj Ahamed | Blockchain Developer",
  description: "Learn more about Mahafuj Ahamed, a full-stack blockchain developer specializing in smart contracts, DApps, and secure web3 systems.",
  keywords: ["Mahafuj Ahamed", "Blockchain Developer", "Web3", "Smart Contracts", "Portfolio"],
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">👋 About Me</h1>

      <section className="mb-10 text-lg text-gray-800">
        <p className="mb-4">
          I’m <strong>Mahafuj Ahamed</strong>, a full-stack blockchain developer passionate about building secure, scalable, and user-friendly Web3 applications.
          With experience in Ethereum, Solidity, smart contract auditing, DApp integration, and backend APIs — I turn ideas into decentralized reality.
        </p>
        <p>
          My mission is to push the boundaries of blockchain development by building fast, secure, and future-ready decentralized applications.
        </p>
      </section>

      {/* 🛠 Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🛠 Tech Stack</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-gray-700">
          <li>Solidity</li>
          <li>Hardhat</li>
          <li>Ethereum</li>
          <li>Next.js</li>
          <li>MongoDB</li>
          <li>Firebase Auth</li>
          <li>Node.js</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
          <li>IPFS</li>
        </ul>
      </section>

      {/* 🕓 Timeline / Experience */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🕓 Experience & Timeline</h2>
        <div className="space-y-4 border-l pl-6">
          <div>
            <h3 className="font-semibold">2024 – Built Smart Contract Portfolio System</h3>
            <p className="text-sm text-gray-600">Created a full CRUD portfolio admin with Firebase, JWT, and MongoDB for blockchain projects.</p>
          </div>
          <div>
            <h3 className="font-semibold">2023 – Deployed NFT Minting DApp</h3>
            <p className="text-sm text-gray-600">Launched an NFT project using ERC-721 contracts on Polygon with marketplace integration.</p>
          </div>
          <div>
            <h3 className="font-semibold">2022 – Freelanced as Smart Contract Developer</h3>
            <p className="text-sm text-gray-600">Audited Solidity contracts, built token vesting logic and launchpad backend systems.</p>
          </div>
        </div>
      </section>

      {/* 🎓 Certifications */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🎓 Certifications</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Certified Blockchain Developer™ – Blockchain Council</li>
          <li>Ethereum Smart Contracts – Coursera</li>
          <li>Chainlink Hackathon 2024 Finalist</li>
        </ul>
      </section>

      {/* 📄 Resume Download */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">📄 Download Resume</h2>
        <a
          href="/Mahafuj-Ahamed-Resume.pdf"
          download
          className="inline-block bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700"
        >
          Download PDF
        </a>
      </section>
    </main>
  );
}
