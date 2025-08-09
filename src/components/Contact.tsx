"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#111] text-white" id="contact">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Contact Me
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-[#1e1e1e] p-4 rounded-lg w-full border border-gray-700 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-[#1e1e1e] p-4 rounded-lg w-full border border-gray-700 focus:outline-none"
            />
          </div>
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            className="bg-[#1e1e1e] p-4 rounded-lg w-full border border-gray-700 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {success && <p className="text-green-400 mt-2">Message sent successfully!</p>}
        </form>

        <div className="mt-12 text-center space-x-6">
          <a
            href="https://github.com/mahafujahamed"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mahafuj-python/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="mailto:mahafujahamed068@gmail.com"
            className="text-blue-400 hover:underline"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
