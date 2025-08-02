export default async function handler(req, res) {
  const { slug } = req.query;
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${slug}`);
  if (!apiRes.ok) return res.status(404).json({ error: "Post not found" });
  const data = await apiRes.json();
  res.status(200).json(data);
}
