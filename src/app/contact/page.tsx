"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Me</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full border p-3 rounded"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <textarea
          className="w-full border p-3 rounded"
          rows={6}
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status === "sent" && (
          <p className="text-green-600 mt-2">✅ Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-2">❌ Something went wrong. Please try again.</p>
        )}
      </form>
    </main>
  );
}
