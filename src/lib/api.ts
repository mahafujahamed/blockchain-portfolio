// lib/api.ts
// Centralized API helpers — always use API_BASE (single source of truth)

const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
// Normalize: remove trailing slash if present
export const API_BASE = RAW_BASE.replace(/\/$/, "");

if (!API_BASE) {
  // Throw early so you notice missing env in dev
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined in .env.local (set e.g. https://your-backend.example.com)"
  );
}

/* ---------------- BLOG ---------------- */
export async function getAllPosts(page = 1, limit = 6) {
  const url = `${API_BASE}/api/blog?page=${page}&limit=${limit}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts (${res.status})`);
  }
  const data = await res.json();
  // Defensive fallback
  if (!data.posts || !Array.isArray(data.posts)) {
    return { posts: [], total: 0 };
  }
  return data;
}


export async function getPostBySlug(slug: string) {
  const url = `${API_BASE}/api/blog/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

/**
 * Note: your current backend does not implement comments routes.
 * If you add them later, update these endpoints accordingly.
 */
export async function getComments(_slug: string) {
  // safe fallback: return empty array if endpoint doesn't exist
  try {
    const url = `${API_BASE}/api/blog/${encodeURIComponent(_slug)}/comments`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function postComment(_slug: string, comment: { name: string; message: string }) {
  const url = `${API_BASE}/api/blog/${encodeURIComponent(_slug)}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error(`Failed to post comment (${res.status})`);
  return res.json();
}

/* ---------------- PROJECTS ---------------- */
export async function getAllProjects() {
  const url = `${API_BASE}/api/projects`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch projects (${res.status})`);
  return res.json();
}

export async function getProjectById(id: string) {
  const url = `${API_BASE}/api/projects/${encodeURIComponent(id)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch project (${res.status})`);
  return res.json();
}

/* ---------------- CONTACTS ---------------- */
/** public contact form POST (no auth) */
export async function sendContactMessage(data: { name: string; email: string; message: string }) {
  const url = `${API_BASE}/api/contact`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to send contact message (${res.status})`);
  return res.json();
}

/** fetch contact messages for admin (requires Firebase ID token) */
export async function getAllContacts(token: string) {
  const url = `${API_BASE}/api/contact`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch contacts (${res.status})`);
  }
  return res.json();
}

/* ---------------- DASHBOARD ---------------- */
/** admin dashboard (requires Firebase ID token) */
export async function getDashboard(token: string) {
  const url = `${API_BASE}/api/dashboard`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch dashboard (${res.status})`);
  return res.json();
}
