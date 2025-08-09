// components/SearchInput.tsx
"use client";

import { useState } from "react";

export function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search posts..."
      className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

