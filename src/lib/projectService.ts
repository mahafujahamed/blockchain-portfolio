export interface ProjectSummary {
  _id: string;
  title: string;
  description: string;
  imageUrls?: string[];
}

export async function getAllProjects(): Promise<ProjectSummary[]> {
  const res = await fetch('/api/projects');
  if (!res.ok) throw new Error('Failed fetching projects');
  return res.json();
}
