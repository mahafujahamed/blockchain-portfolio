// src/app/blog/edit/[id]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function EditPostPage() {
  const router = useRouter()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`)
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    })
    router.push('/blog')
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className="w-full border p-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
          className="w-full border p-2 h-40"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </main>
  )
}
