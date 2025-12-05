'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { PostData } from '@/lib/posts';
import styles from './BlogList.module.css';

interface BlogListProps {
    posts: PostData[];
}

export default function BlogList({ posts }: { posts: any[] }) {
    if (posts.length === 0) {
        return (
            <div className={styles.empty}>
                <p>No blog posts yet. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {posts.map((post, index) => (
                <motion.article
                    key={post._id}
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <Link href={`/blog/${post.slug.current}`} className={styles.cardLink}>
                        {post.mainImage?.asset?.url && (
                            <div className={styles.imageContainer}>
                                <img
                                    src={post.mainImage.asset.url}
                                    alt={post.title}
                                    className={styles.image}
                                />
                            </div>
                        )}
                        <div className={styles.cardContent}>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            {post.excerpt && (
                                <p className={styles.excerpt}>{post.excerpt}</p>
                            )}
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} />
                                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                </div>
                                {post.readTime && (
                                    <div className={styles.metaItem}>
                                        <span>• {post.readTime}</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.readMore}>
                                Read more
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </Link>
                </motion.article>
            ))}
        </div>
    );
}
