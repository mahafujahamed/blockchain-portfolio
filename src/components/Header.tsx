'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import ContactModal from './ContactModal';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      label: 'Projects',
      dropdown: [
        { href: '/projects/web', label: 'Web Apps' },
        { href: '/projects/mobile', label: 'Mobile Apps' },
      ],
    },
    { href: '/skills', label: 'Skills' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={clsx(
        'w-full px-4 md:px-8 py-4 flex items-center justify-between fixed top-0 z-50 transition-all',
        isScrolled ? 'bg-white dark:bg-gray-900 shadow-md backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/my-profile.png"
          alt="Mahafuj Ahamed"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
          priority
        />
        <span className="text-xl font-bold text-gray-900 dark:text-white">Mahafuj Ahamed</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) =>
          link.dropdown ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              ref={dropdownRef}
            >
              <button
                className="text-gray-700 dark:text-gray-200 hover:underline flex items-center"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                {link.label}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-8 left-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md py-2 z-50 min-w-[150px]">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700',
                        pathname === item.href && 'font-bold underline'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'text-gray-700 dark:text-gray-200 hover:underline',
                pathname === link.href && 'font-bold underline'
              )}
            >
              {link.label}
            </Link>
          )
        )}

        {/* 🔘 Modal Trigger */}
        <ContactModal />

        <ThemeToggle />
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 flex flex-col items-center gap-4 py-4 shadow-lg md:hidden">
          {navLinks.map((link) =>
            link.dropdown ? (
              <details key={link.label} className="w-full text-center">
                <summary className="text-gray-700 dark:text-gray-200 cursor-pointer">
                  {link.label}
                </summary>
                <div className="flex flex-col gap-2 mt-2">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-700 dark:text-gray-200 hover:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  'text-gray-700 dark:text-gray-200 hover:underline',
                  pathname === link.href && 'font-bold underline'
                )}
              >
                {link.label}
              </Link>
            )
          )}

          {/* 🔘 Modal Trigger for Mobile */}
          <ContactModal />

          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
