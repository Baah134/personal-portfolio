'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TransitionLink from '@/components/ui/TransitionLink';
import { usePathname } from 'next/navigation';
import { flushSync } from 'react-dom';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/research', label: 'Research', id: 'research' },
  { href: '/projects', label: 'Projects', id: 'projects' },
  { href: '/leadership', label: 'Leadership & Volunteering', id: 'leadership' },
  { href: '/experience', label: 'Experience', id: 'experience' },
  { href: '/blog', label: 'Blog', id: 'blog' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
  }, []);

  // Sync route change and resolve pending view transition promises
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).__resolveViewTransition) {
      setTimeout(() => {
        (window as any).__resolveViewTransition();
      }, 50);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

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
        <TransitionLink href="/" className={styles.logo} id="nav-logo">
          <span className={styles.logoText}>Prince Baah-Mensah</span>
        </TransitionLink>

        <ul
          className={`${styles.links} ${mobileOpen ? styles.open : ''}`}
          id="nav-links"
        >
          {navLinks.map(({ href, label, id }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <li key={href}>
                <TransitionLink
                  href={href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  id={`nav-link-${id}`}
                >
                  {label}
                </TransitionLink>
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

        <div className={styles.navActions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
            type="button"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

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
        </div>
      </nav>
    </header>
  );
}
