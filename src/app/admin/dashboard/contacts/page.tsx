"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const token = await auth.currentUser?.getIdToken();
    const res = await axios.get("/api/contacts", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setContacts(res.data);
  };

  const handleDelete = async (id: string) => {
    const token = await auth.currentUser?.getIdToken();
    await axios.delete(`/api/contacts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>
      <ul className="space-y-4">
        {contacts.map((contact: any) => (
          <li key={contact._id} className="p-4 border rounded">
            <div className="mb-2">
              <strong>{contact.name}</strong> (<a href={`mailto:${contact.email}`} className="text-blue-500">{contact.email}</a>)
            </div>
            <p className="text-gray-700">{contact.message}</p>
            <div className="mt-2 text-sm text-gray-400">{new Date(contact.createdAt).toLocaleString()}</div>
            <button
              onClick={() => handleDelete(contact._id)}
              className="mt-2 text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
