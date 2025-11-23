import { getSortedPostsData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import BlogList from '@/components/BlogList';
import styles from './blog.module.css';

export default function BlogPage() {
    const posts = getSortedPostsData();

    return (
        <>
            <Navbar />
            <main className={styles.blog}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Blog</h1>
                        <p className={styles.subtitle}>
                            Thoughts on DevOps, cloud infrastructure, and automation
                        </p>
                    </div>
                    <BlogList posts={posts} />
                </div>
            </main>
        </>
    );
}
