'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import ContactModal from './ContactModal';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Nav links without dropdown now, Projects is a single link
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },  // no dropdown
    { href: '/skills', label: 'Skills' },
    { href: '/blog', label: 'Blog' },
    // ContactModal will be used instead of '/contact' route
  ];

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
        {navLinks.map((link) => (
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
        ))}

        {/* Contact Modal Button on Desktop */}
        <ContactModal />

        <ThemeToggle />
      </nav>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 flex flex-col items-center gap-4 py-4 shadow-lg md:hidden">
          {navLinks.map((link) => (
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
          ))}

          {/* Contact Modal Button on Mobile */}
          <ContactModal />

          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
