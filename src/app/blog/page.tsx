import { client } from '@/lib/sanity';
import { SanityPost } from '@/lib/posts';
import BlogList from '@/components/BlogList';
import styles from './blog.module.css';

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
        <main className={styles.blog}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Blog</h1>
                    <p className={styles.subtitle}>
                        Thoughts, tutorials, and insights about web development and design.
                    </p>
                </header>
                <BlogList posts={posts} />
            </div>
        </main>
    );
}
