import Link from "next/link";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          className="text-indigo-600 text-sm mt-3 inline-block"
        >
          View Project →
        </a>
      )}
    </div>
  );
}
