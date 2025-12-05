import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { client, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';
import '../markdown.css';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.fetch(
            `*[_type == "post" && slug.current == $slug][0]{
                title,
                publishedAt,
                readTime,
                mainImage {
                    asset->{url}
                },
                body
            }`,
            { slug }
        ).then((data) => {
            setPost(data);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching post:', error);
            setLoading(false);
        });
    }, [slug]);

    const components = {
        types: {
            image: ({ value }) => (
                value?.asset && (
                    <img
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || 'Blog image'}
                        className="rounded-lg my-6 shadow-md"
                    />
                )
            )
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-xl">Loading...</h1>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
            </div>
        );
    }

    return (
        <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-16"
        >
            <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] bg-secondary-900">
                <img
                    src={post.mainImage?.asset?.url}
                    alt={post.title}
                    className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center justify-center space-x-4 text-sm sm:text-base">
                            <span>•</span>
                            <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="markdown-content max-w-3xl mx-auto prose prose-lg">
                    <PortableText value={post.body} components={components} />
                </div>
            </div>
        </motion.article>
    );
};

export default BlogPost;
