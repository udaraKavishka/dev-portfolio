import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import type { PortableTextBlock } from '@portabletext/types';
import { client, urlFor } from '@/lib/sanity';
import Navbar from '@/components/Navbar';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './post.module.css';
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const revalidate = 60;

type CodeBlockValue = {
    language?: string;
    code?: string;
};

type SanityImageValue = {
    asset?: {
        url?: string;
    };
    alt?: string;
};

type SanityPost = {
    title: string;
    publishedAt: string;
    readTime?: string;
    mainImage?: {
        asset?: {
            url?: string;
        };
    };
    body: PortableTextBlock[];
    tags?: string[];
};

const Code = ({ value }: { value: CodeBlockValue }) => (
    <div className="my-10">
        <SyntaxHighlighter language={value?.language ?? 'text'} style={dracula}>
            {value?.code ?? ''}
        </SyntaxHighlighter>
    </div>
);

export async function generateStaticParams() {
    const posts = await client.fetch<Array<{ slug: string }>>(
        `*[_type == "post"]{ "slug": slug.current }`
    );
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await client.fetch<SanityPost | null>(
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

    const components: PortableTextComponents = {
        types: {
            image: ({ value }: { value: SanityImageValue }) => (
                value?.asset && (
                    <div className="my-8">
                        <Image
                            src={urlFor(value).width(1200).height(800).fit('max').url()}
                            alt={value.alt || 'Blog image'}
                            width={1200}
                            height={800}
                            sizes="(max-width: 800px) 100vw, 800px"
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
                                <Image
                                    src={post.mainImage.asset.url}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 800px) 100vw, 800px"
                                    className={styles.mainImage}
                                    priority
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
