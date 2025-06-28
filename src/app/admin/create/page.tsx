// /src/app/admin/create/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CreatePostPage() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch('/api/posts', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // ✅ Important: send cookies!
//       body: JSON.stringify({ title, content, image }),
//     });

//     if (res.ok) {
//       router.push('/admin');
//     } else {
//       alert('Post creation failed');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">Create Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <textarea
//           placeholder="Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full p-2 border rounded h-40"
//         />
//         <input
//           placeholder="Image URL"
//           value={image}
//           onChange={(e) => setImage(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }
