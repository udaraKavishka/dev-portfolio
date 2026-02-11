'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { SanityPost } from '@/lib/posts';
import styles from './HomeBlog.module.css';

interface HomeBlogProps {
    posts: SanityPost[];
}

export default function HomeBlog({ posts }: HomeBlogProps) {
    const latestPosts = posts.slice(0, 3);

    if (latestPosts.length === 0) {
        return null;
    }

    return (
        <section id="blog" className={styles.blog}>
            <div className={styles.container}>
                <h2 className="section-title">Latest Blog Posts</h2>
                <div className={styles.grid}>
                    {latestPosts.map((post, index) => (
                        <motion.article
                            key={post._id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link href={`/blog/${post.slug.current}`} className={styles.cardLink}>
                                {post.mainImage?.asset?.url && (
                                    <div className={styles.imageContainer}>
                                        <Image
                                            src={post.mainImage.asset.url}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 320px"
                                            className={styles.image}
                                        />
                                    </div>
                                )}
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    {post.excerpt && (
                                        <p className={styles.excerpt}>{post.excerpt}</p>
                                    )}
                                    <div className={styles.meta}>
                                        <Calendar size={16} />
                                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        {post.readTime && <span>• {post.readTime}</span>}
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
                <div className={styles.viewMoreContainer}>
                    <Link href="/blog" className={styles.viewMoreButton}>
                        <span>View All Blog Posts</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}