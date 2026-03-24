import { client } from '@/lib/sanity';
import { SanityPost } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import Navbar from '@/components/Navbar';
import styles from './blog.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | DevOps Tutorials & Cloud Engineering',
    description: 'Technical articles about DevOps, cloud infrastructure, Kubernetes, Docker, CI/CD pipelines, MLOps, and software engineering best practices by Udara Nalawansa',
    keywords: [
        'DevOps Blog',
        'Cloud Engineering Tutorials',
        'Kubernetes Guide',
        'Docker Tutorial',
        'CI/CD Best Practices',
        'Infrastructure as Code',
        'AWS Tutorials',
        'MLOps',
        'Technical Blog',
        'Software Engineering'
    ],
    openGraph: {
        title: 'Blog | DevOps Tutorials & Cloud Engineering',
        description: 'Technical articles about DevOps, cloud infrastructure, and software engineering',
        url: 'https://udaradev.me/blog',
        type: 'website',
        images: ['/screenshot.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | DevOps Tutorials & Cloud Engineering',
        description: 'Technical articles about DevOps, cloud infrastructure, and software engineering',
        images: ['/screenshot.png'],
    },
    alternates: {
        canonical: 'https://udaradev.me/blog',
    },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Blog() {
    const posts = await client.fetch<SanityPost[]>(`*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        readTime,
        mainImage {
            asset -> {
                url
            }
        },
        excerpt,
        tags
    }`);

    return (
        <>
            <Navbar />
            <main className={styles.blog}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Blog</h1>
                    <p className={styles.subtitle}>
                        Thoughts, tutorials, and insights .
                    </p>
                </header>
                <BlogList posts={posts} />
            </div>
            </main>
        </>
    );
}
