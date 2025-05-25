'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';


export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateOrUpdatePost = async () => {
    if (!title || !content) return;

    setLoading(true);
    try {
      const res = await fetch(
        editingId ? `/api/posts/${editingId}` : '/api/posts',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        }
      );

      if (res.ok) {
        setTitle('');
        setContent('');
        setEditingId(null);
        fetchPosts();
      } else {
        const errorData = await res.json();
        console.error('Failed:', errorData.error);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        const errorData = await res.json();
        console.error('Delete failed:', errorData.error);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditingId(typeof post._id === 'object' ? post._id.toString() : post._id);
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">📝 Blog</h1>

        <div className="space-y-4 mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-900 dark:text-white"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateOrUpdatePost}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
            >
              {loading ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Post' : 'Create Post')}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setContent('');
                }}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {posts.length === 0 && (
            <p className="text-gray-600 dark:text-gray-400">No posts yet.</p>
          )}
          {posts.map((post) => (
            <motion.article
              key={typeof post._id === 'object' ? post._id.toString() : post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-md border border-gray-200 dark:border-gray-700 shadow bg-white dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id.toString())}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
