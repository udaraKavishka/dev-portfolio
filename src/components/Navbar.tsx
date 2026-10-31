'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';
import { applyTheme, getTheme, toggleTheme as toggleThemeState, THEME_EVENT, type Theme } from '@/lib/theme';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#journey', label: 'Journey' },
    { href: '/blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track whichever home page section crosses the middle of the viewport; sections
    // without a nav link (Skills, Education, ...) clear the highlight.
    useEffect(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Sync from the shared theme source: apply the stored/current theme on mount,
    // and follow any change made elsewhere (e.g. the terminal `theme` command).
    useEffect(() => {
        let initial = getTheme();
        try {
            const stored = localStorage.getItem('theme') as Theme | null;
            if (stored === 'dark' || stored === 'light') initial = stored;
        } catch {
            /* ignore */
        }

        const onThemeChange = (e: Event) => {
            setTheme((e as CustomEvent<Theme>).detail);
        };
        window.addEventListener(THEME_EVENT, onThemeChange);
        // applyTheme dispatches THEME_EVENT synchronously, syncing state via the listener above.
        applyTheme(initial);
        return () => window.removeEventListener(THEME_EVENT, onThemeChange);
    }, []);

    const toggleTheme = () => {
        setTheme(toggleThemeState());
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();

            // Check if we're on a blog page
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/blog')) {
                router.push('/' + href);
                setIsOpen(false);
            } else {
                // We're on home page, just scroll
                const element = document.querySelector(href);
                if (element) {
                    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
                    setIsOpen(false);
                }
            }
        } else if (href.startsWith('/')) {
            // For internal routes like /blog, use Next.js navigation
            setIsOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.prompt}>$</span> udaradev.sh
                </Link>

                <div className={styles.desktop}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            prefetch={false}
                            className={`${styles.link} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                            aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className={styles.mobile}>
                    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={styles.menuButton}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            prefetch={false}
                            className={`${styles.mobileLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                            aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
