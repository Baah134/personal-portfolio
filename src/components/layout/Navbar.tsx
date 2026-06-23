'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/research', label: 'Research', id: 'research' },
  { href: '/projects', label: 'Projects', id: 'projects' },
  { href: '/leadership', label: 'Leadership & Volunteer', id: 'leadership' },
  { href: '/experience', label: 'Experience', id: 'experience' },
  { href: '/blog', label: 'Blog', id: 'blog' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      id="site-navbar"
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoText}>Prince Baah-Mensah</span>
        </Link>

        <ul
          className={`${styles.links} ${mobileOpen ? styles.open : ''}`}
          id="nav-links"
        >
          {navLinks.map(({ href, label, id }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  id={`nav-link-${id}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          {/* Resume button hidden per request
          <li className={styles.ctaItem}>
            <a
              href="/CV.pdf"
              download
              className={styles.cvButton}
              id="nav-download-cv"
            >
              Resume
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </li>
          */}
        </ul>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerActive : ''}`}
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="nav-links"
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
          type="button"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>
    </header>
  );
}
