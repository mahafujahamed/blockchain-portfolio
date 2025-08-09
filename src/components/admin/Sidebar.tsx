"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Briefcase, Mail } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Posts", href: "/admin/posts", icon: <FileText size={18} /> },
  { label: "Projects", href: "/admin/projects", icon: <Briefcase size={18} /> },
  { label: "Contacts", href: "/admin/contacts", icon: <Mail size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-300 dark:border-zinc-800 p-6">
      <h2 className="text-xl font-bold mb-8 text-zinc-800 dark:text-white">Admin Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium
                ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
