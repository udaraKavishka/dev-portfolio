import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './post.module.css';
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const revalidate = 60;

const Code = ({ value }: any) => (
    <div className="my-10">
        <SyntaxHighlighter language={value?.language ?? 'text'} style={dracula}>
            {value?.code ?? ''}
        </SyntaxHighlighter>
    </div>
);

export async function generateStaticParams() {
    const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);
    return posts.map((post: any) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0]{
            title,
            publishedAt,
            readTime,
            mainImage {
                asset->{url}
            },
            body,
            tags
        }`,
        { slug }
    );

    if (!post) {
        return <div>Post not found</div>;
    }

    const components = {
        types: {
            image: ({ value }: any) => (
                value?.asset && (
                    <div className="my-8">
                        <img
                            src={urlFor(value).url()}
                            alt={value.alt || 'Blog image'}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                )
            ),
            code: Code,
        }
    };

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
                            <h1 className={styles.title}>{post.title}</h1>
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

                        {post.mainImage?.asset?.url && (
                            <div className={styles.mainImageContainer}>
                                <img
                                    src={post.mainImage.asset.url}
                                    alt={post.title}
                                    className={styles.mainImage}
                                />
                            </div>
                        )}

                        <div className={styles.content}>
                            <PortableText value={post.body} components={components} />
                        </div>
                    </article>
                </div>
            </main>
        </>
    );
}
