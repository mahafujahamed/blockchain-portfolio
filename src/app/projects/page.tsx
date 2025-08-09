import { Metadata } from "next";
import { getAllProjects } from "@/lib/api"; // adjust path if needed

export const metadata: Metadata = {
  title: "Projects – Mahafuj Ahamed",
  description:
    "Explore Mahafuj Ahamed's blockchain projects, including smart contracts, dApps, NFT platforms, and decentralized protocols.",
};

type Project = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  techStack?: string[];
  github?: string;
  liveDemo?: string;
};

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    projects = await getAllProjects();
  } catch (error) {
    console.error("Failed to load projects:", error);
    // Optionally, you can handle UI fallback here or throw to show error page
    // throw error;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center">My Blockchain Projects</h1>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg mb-4 object-cover h-40 w-full"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              {project.techStack && (
                <ul className="flex flex-wrap gap-2 text-sm text-indigo-600 font-medium">
                  {project.techStack.map((tech, idx) => (
                    <li key={idx} className="bg-indigo-100 px-2 py-1 rounded">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-4 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 underline"
                  >
                    GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
