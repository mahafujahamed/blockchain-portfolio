import { Metadata } from "next";

type Project = {
  _id: string;
  title: string;
  description: string;
  content?: string;
  techStack?: string[];
  image?: string;
  github?: string;
  liveDemo?: string;
};

interface Params {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata for SEO based on project data
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${params.slug}`
  );

  if (!res.ok) {
    return {
      title: "Project Not Found – Mahafuj Ahamed",
      description: "Project details not available.",
    };
  }

  const project: Project = await res.json();

  return {
    title: `${project.title} – Mahafuj Ahamed`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: Params) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${params.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p>Sorry, we couldn’t find the project you’re looking for.</p>
      </main>
    );
  }

  const project: Project = await res.json();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold">{project.title}</h1>

      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="rounded-lg w-full max-h-[400px] object-cover"
        />
      )}

      <p className="text-lg text-gray-700">{project.description}</p>

      {project.techStack && (
        <ul className="flex flex-wrap gap-2 text-sm text-indigo-600 font-medium">
          {project.techStack.map((tech, idx) => (
            <li key={idx} className="bg-indigo-100 px-2 py-1 rounded">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {project.content && (
        <article className="prose max-w-none mt-6">
          {/* You can expand this to render markdown or rich content */}
          <p>{project.content}</p>
        </article>
      )}

      <div className="flex gap-4 mt-6">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Code
          </a>
        )}
        {project.liveDemo && (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            Live Demo
          </a>
        )}
      </div>
    </main>
  );
}
