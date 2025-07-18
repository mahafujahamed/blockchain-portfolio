import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <Link href="/admin/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Create Post</Link>
    </div>
  );
}
