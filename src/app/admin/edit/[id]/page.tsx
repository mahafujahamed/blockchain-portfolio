// src/app/admin/edit/[id]/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// export default function EditPost() {
//   const { id } = useParams();
//   const [form, setForm] = useState({ title: '', content: '', image: '' });
//   const router = useRouter();

//   useEffect(() => {
//     fetch(`/api/posts/${id}`)
//       .then((res) => res.json())
//       .then((data) => setForm({ title: data.title, content: data.content, image: data.image || '' }));
//   }, [id]);

//   const handleUpdate = async (e: any) => {
//     e.preventDefault();
//     await fetch(`/api/posts/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     router.push('/admin');
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Edit Post</h1>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           value={form.content}
//           onChange={(e) => setForm({ ...form, content: e.target.value })}
//           className="w-full p-2 h-40 border rounded"
//           required
//         />
//         <input
//           type="url"
//           value={form.image}
//           onChange={(e) => setForm({ ...form, image: e.target.value })}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update Post
//         </button>
//       </form>
//     </div>
//   );
// }
