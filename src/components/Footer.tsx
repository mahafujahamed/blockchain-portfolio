import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 mt-16 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">© {new Date().getFullYear()} Mahafuj Ahamed. All rights reserved.</p>
      <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-400">
        <Link href="https://github.com/mahafujahamed" target="_blank" aria-label="GitHub">
          <FaGithub className="hover:text-gray-800 dark:hover:text-white" size={22} />
        </Link>
        <Link href="https://linkedin.com/in/mahafuj-python" target="_blank" aria-label="LinkedIn">
          <FaLinkedin className="hover:text-blue-700 dark:hover:text-blue-400" size={22} />
        </Link>
        <Link href="https://twitter.com/devmahafuj" target="_blank" aria-label="Twitter">
          <FaTwitter className="hover:text-blue-500 dark:hover:text-blue-300" size={22} />
        </Link>
      </div>
    </footer>
  );
}
