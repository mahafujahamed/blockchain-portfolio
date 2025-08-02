import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";
import ProjectPreview from "@/components/home/ProjectPreview";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Mahafuj Ahamed – Blockchain Developer",
  description:
    "Experienced blockchain developer specializing in smart contracts, dApps, and decentralized systems. Explore portfolio, projects, and contact info.",
};

export default function HomePage() {
  return (
    <main className="space-y-16 px-6 md:px-12 lg:px-24 py-12">
      <HeroSection />
      <SkillsSection />
      <ProjectPreview />
      <BlogPreview />
      <ContactCTA />
    </main>
  );
}
