// components/FilterBar.tsx
"use client";

export function FilterBar({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
