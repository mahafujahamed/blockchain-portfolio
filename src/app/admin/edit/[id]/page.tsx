import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { notFound } from 'next/navigation';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  await connectDB();

  const post = await Post.findById(resolvedParams.id);
  if (!post) return notFound();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form className="space-y-4">
        <input
          name="title"
          defaultValue={post.title}
          className="w-full border px-4 py-2 rounded-md"
        />
        <textarea
          name="content"
          defaultValue={post.content}
          rows={6}
          className="w-full border px-4 py-2 rounded-md"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Save
        </button>
      </form>
    </div>
  );
}
