'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    useEffect(() => {
        const category = new URLSearchParams(window.location.search).get('category');
        if (category) {
            setActiveCategory(category);
        }
    }, []);

    const filteredPosts = activeCategory
        ? posts.filter((post) => post.category === activeCategory)
        : posts;

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
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(index * 0.03, 0.6), duration: 0.4 }}
                        >
                            <Link href={`/blog/${post.slug}`} className={styles.row}>
                                <span className={styles.rowTitle}>{post.title}</span>
                                <span className={styles.rowDate}>{formatDate(post.date)}</span>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            )}
        </div>
    );
}
