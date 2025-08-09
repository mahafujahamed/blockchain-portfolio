export default function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200 font-medium">
      #{tag}
    </span>
  );
}
