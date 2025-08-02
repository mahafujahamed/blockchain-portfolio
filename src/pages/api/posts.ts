export default async function handler(req, res) {
  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts`);
  const data = await apiRes.json();
  res.status(200).json(data);
}
