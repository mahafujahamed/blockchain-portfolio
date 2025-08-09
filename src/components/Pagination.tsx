"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }
    router.push(`/blog?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={`px-3 py-1 text-sm rounded ${
            i + 1 === currentPage
              ? "bg-blue-600 text-white"
              : "border hover:bg-gray-100 dark:hover:bg-zinc-700"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-zinc-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
