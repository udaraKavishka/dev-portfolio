'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/posts';
import styles from './HomeBlog.module.css';

interface HomeBlogProps {
    posts: Post[];
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function HomeBlog({ posts }: HomeBlogProps) {
    const latestPosts = posts.slice(0, 5);

    if (latestPosts.length === 0) {
        return null;
    }

    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <h2 className="section-title">Latest Blog Posts</h2>
                <div className={styles.list}>
                    {latestPosts.map((post, index) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                        >
                            <Link href={`/blog/${post.slug}`} className={styles.row}>
                                <span className={styles.rowTitle}>{post.title}</span>
                                <span className={styles.rowDate}>{formatDate(post.date)}</span>
                            </Link>
                        </motion.article>
                    ))}
                </div>
                <div className={styles.viewMoreContainer}>
                    <Link href="/blog" className={styles.viewMoreButton}>
                        <span>view all posts</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
