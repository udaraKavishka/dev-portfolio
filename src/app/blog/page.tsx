import { getAllPosts, getSearchIndex } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import Navbar from '@/components/Navbar';
import styles from './blog.module.css';
import type { Metadata } from 'next';
import { BlogListingSchema, BreadcrumbSchema } from '@/components/StructuredData';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'DevOps and Cloud Engineering Blog',
    description: 'DevOps and cloud engineering articles by Udara Nalawansa covering Kubernetes, Docker, CI/CD pipelines, Terraform, AWS, MLOps, and software engineering.',
    openGraph: {
        title: 'DevOps and Cloud Engineering Blog | Udara Nalawansa',
        description: 'Technical articles about DevOps, cloud infrastructure, Kubernetes, Docker, CI/CD, Terraform, and MLOps.',
        url: absoluteUrl('/blog'),
        type: 'website',
        images: ['/screenshot.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DevOps and Cloud Engineering Blog | Udara Nalawansa',
        description: 'Technical articles about DevOps, cloud infrastructure, Kubernetes, Docker, CI/CD, Terraform, and MLOps.',
        images: ['/screenshot.png'],
    },
    alternates: {
        canonical: absoluteUrl('/blog'),
    },
};

export default function Blog() {
    const posts = getAllPosts();
    const searchIndex = getSearchIndex();

    return (
        <>
            <BreadcrumbSchema items={[
                { name: 'Home', url: '/' },
                { name: 'Blog', url: '/blog' },
            ]} />
            <BlogListingSchema />
            <Navbar />
            <main className={styles.blog}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>blog</h1>
                    <p className={styles.subtitle}>
                        notes from my internship, research, and self-learning. devops, kubernetes, ML, and the bugs in between.
                    </p>
                </header>
                <BlogList posts={posts} searchIndex={searchIndex} />
            </div>
            </main>
        </>
    );
}
