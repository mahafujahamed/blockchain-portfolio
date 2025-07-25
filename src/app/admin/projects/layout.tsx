import Link from 'next/link';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Projects Admin</h1>
      <nav className="mb-6">
        <Link href="/admin/projects" className="mr-4 text-blue-600">All Projects</Link>
        <Link href="/admin/projects/create" className="text-green-600">Create Project</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
