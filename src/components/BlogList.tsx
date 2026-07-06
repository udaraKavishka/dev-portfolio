'use client';

import Link from 'next/link';
import { useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Pin } from 'lucide-react';
import type { Post } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import styles from './BlogList.module.css';

interface BlogListProps {
    posts: Post[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function BlogList({ posts }: BlogListProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return new URLSearchParams(window.location.search).get('category');
    });

    const storageKey = `blog-scroll:${activeCategory ?? 'all'}`;
    const rememberPost = (slug: string) => (e: React.MouseEvent<HTMLElement>) => {
        try {
            const top = e.currentTarget.getBoundingClientRect().top;
            sessionStorage.setItem(storageKey, JSON.stringify({ slug, top }));
        } catch {
        }
    };

    // Known at first render so we can skip the entrance animation when restoring
    // (a replayed stagger would shift rows under the restored offset).
    const [restoring] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            return sessionStorage.getItem(storageKey) !== null;
        } catch {
            return false;
        }
    });

    useLayoutEffect(() => {
        let saved: { slug: string; top: number } | null = null;
        try {
            const raw = sessionStorage.getItem(storageKey);
            saved = raw ? JSON.parse(raw) : null;
        } catch {
            saved = null;
        }
        if (!saved) return;

        let userScrolled = false;
        const stop = () => {
            userScrolled = true;
        };
        const applyAnchor = () => {
            if (userScrolled || !saved) return;
            const el = document.querySelector<HTMLElement>(`[data-slug="${saved.slug}"]`);
            if (!el) return;
            const delta = el.getBoundingClientRect().top - saved.top;
            if (Math.abs(delta) > 1) {
                window.scrollBy({ top: delta, behavior: 'instant' as ScrollBehavior });
            }
        };

        window.addEventListener('wheel', stop, { passive: true });
        window.addEventListener('touchmove', stop, { passive: true });
        window.addEventListener('keydown', stop);

        applyAnchor();
        const raf = requestAnimationFrame(applyAnchor);
        document.fonts?.ready.then(applyAnchor).catch(() => {});

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('wheel', stop);
            window.removeEventListener('touchmove', stop);
            window.removeEventListener('keydown', stop);
        };
        // Restore only on the initial mount for this component instance.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredPosts = (
        activeCategory
            ? posts.filter((post) => post.category === activeCategory)
            : posts
    )
        .slice()
        .sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false));

    const setCategory = (slug: string | null) => {
        setActiveCategory(slug);
        window.history.replaceState(null, '', slug ? `/blog?category=${slug}` : '/blog');
    };

    return (
        <div>
            <div className={styles.filters}>
                <button
                    className={`${styles.filter} ${!activeCategory ? styles.filterActive : ''}`}
                    onClick={() => setCategory(null)}
                >
                    all
                </button>
                {CATEGORIES.map((category) => (
                    <button
                        key={category.slug}
                        className={`${styles.filter} ${activeCategory === category.slug ? styles.filterActive : ''}`}
                        onClick={() => setCategory(category.slug)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {filteredPosts.length === 0 ? (
                <div className={styles.empty}>
                    <p>No posts in this category yet.</p>
                </div>
            ) : (
                <div className={styles.list}>
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={restoring ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.03, 0.6), duration: 0.4 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className={styles.row}
                                data-slug={post.slug}
                                onClick={rememberPost(post.slug)}
                            >
                                <span className={styles.rowTitle}>
                                    {post.pinned && <Pin size={13} className={styles.pinIcon} />}
                                    {post.title}
                                </span>
                                <span className={styles.rowDate}>{formatDate(post.date)}</span>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    );
}
