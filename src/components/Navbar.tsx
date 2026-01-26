'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#skills', label: 'Skills' },
        { href: '#education', label: 'Education' },
        // { href: '#achievements', label: 'Achievements' },
        { href: '#clubs', label: 'Clubs' },
        { href: '#setup', label: 'Setup' },
        { href: '#contact', label: 'Contact' },
        { href: '/blog', label: 'Blog' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();

            // Check if we're on a blog page
            const currentPath = window.location.pathname;
            if (currentPath.startsWith('/blog')) {
                // Navigate to home page with hash
                window.location.href = '/' + href;
            } else {
                // We're on home page, just scroll
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
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
                            className={styles.link}
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
                            className={styles.mobileLink}
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
