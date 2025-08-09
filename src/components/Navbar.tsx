// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>(pathname);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Scrollspy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && id) {
            setActive(`/${id === "home" ? "" : id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    navItems.forEach((item) => {
      const sectionId = item.href === "/" ? "home" : item.href.replace("/", "");
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const renderNavLink = (item: { name: string; href: string }) => {
    const isActive = active === item.href;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`group relative transition font-medium ${
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-300"
        }`}
      >
        {item.name}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${
            isActive ? "w-full" : ""
          } bg-gradient-to-r from-blue-500 to-purple-500 rounded`}
        />
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-background shadow-sm">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Mahafuj Ahamed
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(renderNavLink)}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded transition text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
          >
            {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden bg-white dark:bg-zinc-800 px-4"
          >
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 border-b transition font-medium ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 underline underline-offset-4"
                      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  } border-gray-200 dark:border-zinc-700`}
                >
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
