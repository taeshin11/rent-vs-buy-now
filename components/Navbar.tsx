'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';

interface NavbarProps {
  locale: string;
}

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: 'KO' },
  { code: 'ja', label: 'JA' },
  { code: 'zh', label: 'ZH' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'pt', label: 'PT' },
];

export default function Navbar({ locale }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const prefix = locale === 'en' ? '' : `/${locale}`;

  const navLinks = [
    { href: `${prefix}/`, label: 'Home' },
    { href: `${prefix}/cities`, label: 'Cities' },
    { href: `${prefix}/states`, label: 'States' },
    { href: `${prefix}/calculator`, label: 'Calculator' },
    { href: `${prefix}/guide`, label: 'Guide' },
    { href: `${prefix}/faq`, label: 'FAQ' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`${prefix}/`} className="flex items-center gap-2 font-bold text-xl text-orange-600">
            <TrendingUp className="w-6 h-6" />
            <span>RentVsBuyNow</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-stone-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Locale Switcher + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <select
              className="text-xs border border-orange-200 rounded px-2 py-1 bg-white text-stone-700 cursor-pointer"
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const segments = pathname.split('/').filter(Boolean);
                // Remove locale prefix if present
                const knownLocales = ['ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
                if (knownLocales.includes(segments[0])) {
                  segments.shift();
                }
                const newPath = newLocale === 'en'
                  ? '/' + segments.join('/')
                  : '/' + newLocale + (segments.length ? '/' + segments.join('/') : '');
                window.location.href = newPath || '/';
              }}
            >
              {locales.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <button
              className="md:hidden p-2 text-stone-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-orange-100 py-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium ${
                  isActive(link.href)
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-stone-700 hover:bg-orange-50'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
