export default function Footer() {
  return (
    <footer className="text-center py-6 border-t mt-12 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Mahafuj Ahamed. All rights reserved.
      </p>
    </footer>
  );
}
