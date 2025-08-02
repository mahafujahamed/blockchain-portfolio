const skills = [
  "Solidity", "Web3.js", "Ether.js", "Hardhat",
  "React", "Next.js", "Node.js", "MongoDB",
  "Smart Contracts", "DeFi", "IPFS", "Firebase",
];

export default function SkillsSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Skills & Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="bg-gray-100 px-4 py-2 rounded-lg text-center text-sm font-medium"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
