'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import type { Post } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
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

function categoryLabel(slug?: string) {
    return CATEGORIES.find((category) => category.slug === slug)?.label ?? slug;
}

function shortReadTime(readTime?: string) {
    return readTime?.replace(/\s*read$/i, '');
}

export default function HomeBlog({ posts }: HomeBlogProps) {
    const latestPosts = posts.slice(0, 5);

    if (latestPosts.length === 0) {
        return null;
    }

    const [featured, ...rest] = latestPosts;

    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <h2 className="section-title">Latest Blog Posts</h2>

                <motion.article
                    className={`${styles.featured} ${featured.mainImage ? styles.featuredWithImage : ''}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.45 }}
                >
                    <div className={styles.featuredBody}>
                        <div className={styles.featuredMeta}>
                            <span className={styles.featuredLabel}>latest</span>
                            {featured.category && <span className={styles.category}>{categoryLabel(featured.category)}</span>}
                            {featured.readTime && (
                                <span className={styles.readTime}>
                                    <Clock size={13} aria-hidden="true" />
                                    {shortReadTime(featured.readTime)}
                                </span>
                            )}
                        </div>
                        <h3 className={styles.featuredTitle}>
                            <Link href={`/blog/${featured.slug}`} className={styles.featuredLink}>
                                {featured.title}
                            </Link>
                        </h3>
                        {featured.excerpt && <p className={styles.excerpt}>{featured.excerpt}</p>}
                        <div className={styles.featuredFoot}>
                            <span className={styles.date}>{formatDate(featured.date)}</span>
                            <span className={styles.readMore}>
                                Read post
                                <ArrowRight size={16} aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                    {featured.mainImage && (
                        <div className={styles.featuredImage}>
                            <Image
                                src={featured.mainImage}
                                alt={featured.mainImageAlt ?? ''}
                                fill
                                sizes="(max-width: 768px) 100vw, 480px"
                                className={styles.featuredImg}
                            />
                        </div>
                    )}
                </motion.article>

                <ul className={styles.list}>
                    {rest.map((post, index) => (
                        <motion.li
                            key={post.slug}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: index * 0.06, duration: 0.4 }}
                        >
                            <Link href={`/blog/${post.slug}`} className={styles.row}>
                                <span className={styles.rowDate}>{formatDate(post.date)}</span>
                                <span className={styles.rowTitle}>{post.title}</span>
                                <span className={styles.rowMeta}>
                                    {post.category && <span className={styles.category}>{categoryLabel(post.category)}</span>}
                                    {post.readTime && <span className={styles.rowRead}>{shortReadTime(post.readTime)}</span>}
                                </span>
                                <ArrowUpRight size={18} className={styles.rowArrow} aria-hidden="true" />
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                <div className={styles.viewMoreContainer}>
                    {/* No prefetch: the blog index carries the full-text search index for every post */}
                    <Link href="/blog" prefetch={false} className={styles.viewMoreButton}>
                        <span>view all posts</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
