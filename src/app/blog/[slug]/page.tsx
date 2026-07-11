import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import Navbar from '@/components/Navbar';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { createMdxComponents } from '@/lib/mdx-components';
import styles from './post.module.css';
import type { Metadata } from 'next';
import { absoluteUrl, SITE_URL } from '@/lib/seo';

const mdxComponents = createMdxComponents(styles.contentImage);

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const postUrl = absoluteUrl(`/blog/${slug}`);
    const imageUrl = post.mainImage || '/screenshot.png';
    const title = post.seoTitle || post.title;
    const description = post.seoDescription || post.excerpt || `Read ${post.title} by Udara Nalawansa, DevOps engineer in Sri Lanka.`;

    return {
        title,
        description: description,
        authors: [{ name: 'Udara Nalawansa', url: absoluteUrl('/') }],
        openGraph: {
            type: 'article',
            url: postUrl,
            title,
            description: description,
            publishedTime: post.date,
            authors: ['Udara Nalawansa'],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.mainImageAlt || post.title,
                }
            ],
            siteName: 'Udara Nalawansa Blog',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: description,
            images: [{ url: imageUrl, alt: post.mainImageAlt || post.title }],
            creator: '@udaranalawansa',
        },
        alternates: {
            canonical: postUrl,
        },
        other: {
            'article:author': SITE_URL,
            'article:section': 'Technology',
        },
    };
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug);

    return (
        <>
            <BreadcrumbSchema items={[
                { name: 'Home', url: SITE_URL },
                { name: 'Blog', url: '/blog' },
                { name: post.title, url: `/blog/${slug}` }
            ]} />
            <ArticleSchema
                title={post.title}
                publishedAt={post.date}
                modifiedAt={post.updated}
                excerpt={post.excerpt}
                imageUrl={post.mainImage ? absoluteUrl(post.mainImage) : undefined}
                tags={post.tags}
                slug={slug}
            />
            <Navbar />
            <main className={styles.post}>
                <div className={styles.container}>
                    <Link href="/blog" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} />
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                </div>
                                {post.readTime && (
                                    <div className={styles.metaItem}>
                                        <span>• {post.readTime}</span>
                                    </div>
                                )}
                                {post.category && (
                                    <Link
                                        href={`/blog?category=${post.category}`}
                                        className={styles.categoryChip}
                                    >
                                        {CATEGORIES.find((c) => c.slug === post.category)?.label ?? post.category}
                                    </Link>
                                )}
                                {post.tags && post.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className={styles.tag}>
                                                <Tag size={14} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>

                        {post.mainImage && (
                            <div className={styles.mainImageContainer}>
                                <Image
                                    src={post.mainImage}
                                    alt={post.mainImageAlt || post.title}
                                    fill
                                    sizes="(max-width: 800px) 100vw, 800px"
                                    className={styles.mainImage}
                                    priority
                                />
                            </div>
                        )}

                        <div className={styles.content}>
                            <MDXRemote
                                source={post.content}
                                components={mdxComponents}
                                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                            />
                        </div>
                    </article>

                    {relatedPosts.length > 0 && (
                        <section className={styles.related}>
                            <h2 className={styles.relatedTitle}>Related Posts</h2>
                            <div className={styles.relatedList}>
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.slug}
                                        href={`/blog/${relatedPost.slug}`}
                                        className={styles.relatedRow}
                                    >
                                        <span className={styles.relatedRowTitle}>{relatedPost.title}</span>
                                        <span className={styles.relatedRowDate}>
                                            {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}
