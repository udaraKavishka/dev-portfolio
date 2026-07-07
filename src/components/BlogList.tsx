'use client';

import Link from 'next/link';
import { useState, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Pin, Search } from 'lucide-react';
import type { Post, SearchEntry } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import styles from './BlogList.module.css';

interface BlogListProps {
    posts: Post[];
    searchIndex: SearchEntry[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

// Wrap every occurrence of `q` (already lowercased) in a highlight <mark>.
function highlight(text: string, q: string) {
    if (!q) return text;
    const lower = text.toLowerCase();
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    let idx = lower.indexOf(q);
    let key = 0;
    while (idx !== -1) {
        if (idx > cursor) parts.push(text.slice(cursor, idx));
        parts.push(
            <mark key={key++} className={styles.mark}>
                {text.slice(idx, idx + q.length)}
            </mark>
        );
        cursor = idx + q.length;
        idx = lower.indexOf(q, cursor);
    }
    if (cursor < text.length) parts.push(text.slice(cursor));
    return parts;
}

// A short excerpt of the body around the match, with the match highlighted.
function bodySnippet(body: string, q: string) {
    const idx = body.indexOf(q);
    if (idx === -1) return null;
    const start = Math.max(0, idx - 30);
    const end = Math.min(body.length, idx + q.length + 45);
    const prefix = start > 0 ? '… ' : '';
    const suffix = end < body.length ? ' …' : '';
    return (
        <>
            {prefix}
            {highlight(body.slice(start, end), q)}
            {suffix}
        </>
    );
}

export default function BlogList({ posts, searchIndex }: BlogListProps) {
    const router = useRouter();
    const searchRef = useRef<HTMLInputElement>(null);
    const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const [activeCategory, setActiveCategory] = useState<string | null>(() => {
        if (typeof window === 'undefined') return null;
        return new URLSearchParams(window.location.search).get('category');
    });
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const bodyMap = useMemo(() => {
        return new Map(searchIndex.map((entry) => [entry.slug, entry.body]));
    }, [searchIndex]);

    const filteredPosts = useMemo(() => {
        const byCategory = (
            activeCategory
                ? posts.filter((post) => post.category === activeCategory)
                : posts
        )
            .slice()
            .sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false));

        const q = query.trim().toLowerCase();
        if (!q) return byCategory;

        // Rank title/subtitle matches above body-only matches.
        const titleMatches: Post[] = [];
        const bodyMatches: Post[] = [];
        for (const post of byCategory) {
            const inTitle =
                post.title.toLowerCase().includes(q) ||
                (post.excerpt?.toLowerCase().includes(q) ?? false);
            if (inTitle) {
                titleMatches.push(post);
            } else if (bodyMap.get(post.slug)?.includes(q)) {
                bodyMatches.push(post);
            }
        }
        return [...titleMatches, ...bodyMatches];
    }, [posts, activeCategory, query, bodyMap]);

    // Reset the highlight whenever the visible set changes (adjust-state-during-render).
    const selectionKey = `${activeCategory ?? ''}|${query.trim().toLowerCase()}`;
    const [prevSelectionKey, setPrevSelectionKey] = useState(selectionKey);
    if (selectionKey !== prevSelectionKey) {
        setPrevSelectionKey(selectionKey);
        setSelectedIndex(0);
    }

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

    const categoryCounts = CATEGORIES.reduce<Record<string, number>>((acc, category) => {
        acc[category.slug] = posts.filter((post) => post.category === category.slug).length;
        return acc;
    }, {});

    const setCategory = (slug: string | null) => {
        setActiveCategory(slug);
        window.history.replaceState(null, '', slug ? `/blog?category=${slug}` : '/blog');
    };

    return (
        <div>
            <div className={styles.guide}>
                <span><kbd className={styles.kbd}>j</kbd><kbd className={styles.kbd}>k</kbd> move</span>
                <span><kbd className={styles.kbd}>enter</kbd> open</span>
                <span><kbd className={styles.kbd}>/</kbd> search</span>
                <span><kbd className={styles.kbd}>g</kbd>/<kbd className={styles.kbd}>G</kbd> top / bottom</span>
            </div>

            <div className={styles.search}>
                <Search size={15} className={styles.searchIcon} />
                <input
                    ref={searchRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="search posts… ( / )"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="search posts"
                    autoComplete="off"
                    spellCheck={false}
                />
            </div>

            <div className={styles.filters}>
                <button
                    className={`${styles.filter} ${!activeCategory ? styles.filterActive : ''}`}
                    onClick={() => setCategory(null)}
                >
                    all ({posts.length})
                </button>
                {CATEGORIES.map((category) => (
                    <button
                        key={category.slug}
                        className={`${styles.filter} ${activeCategory === category.slug ? styles.filterActive : ''}`}
                        onClick={() => setCategory(category.slug)}
                    >
                        {category.label} ({categoryCounts[category.slug]})
                    </button>
                ))}
            </div>

            {filteredPosts.length === 0 ? (
                <div className={styles.empty}>
                    <p>{query ? 'No posts match your search.' : 'No posts in this category yet.'}</p>
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
