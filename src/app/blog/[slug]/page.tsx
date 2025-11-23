import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import Navbar from '@/components/Navbar';
import styles from './post.module.css';

export function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.id,
    }));
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return (
        <>
            <Navbar />
            <main className={styles.post}>
                <div className={styles.container}>
                    <Link href="/blog" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        Back to Blog
                    </Link>

                    <article className={styles.article}>
                        <header className={styles.header}>
                            <h1 className={styles.title}>{postData.title}</h1>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} />
                                    <span>{postData.date}</span>
                                </div>
                                {postData.tags && postData.tags.length > 0 && (
                                    <div className={styles.tags}>
                                        {postData.tags.map((tag: string) => (
                                            <span key={tag} className={styles.tag}>
                                                <Tag size={14} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>

                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
                        />
                    </article>
                </div>
            </main>
        </>
    );
}
