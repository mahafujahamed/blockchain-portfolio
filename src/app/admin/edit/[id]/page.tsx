'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPost() {
  const [post, setPost] = useState({ title: '', content: '' });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    router.push('/admin');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push('/admin');
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} required />
      <textarea value={post.content} onChange={e => setPost({ ...post, content: e.target.value })} required />
      <button type="submit">Update Post</button>
      <button type="button" onClick={handleDelete}>Delete Post</button>
    </form>
  );
}
