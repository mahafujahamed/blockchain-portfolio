import Link from "next/link";

export default function PostCard({ post }: { post: any }) {
  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition">
      <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{post.excerpt || post.description}</p>
      <Link
        href={`/posts/${post.slug}`}
        className="text-indigo-600 text-sm hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
}
