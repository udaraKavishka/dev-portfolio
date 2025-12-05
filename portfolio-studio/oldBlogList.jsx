import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { client } from '../sanity';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  slug,
  readTime,
  publishedAt,
  mainImage {
    asset -> {
      url
    }
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url
      }
    }
  }
}`);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts from Sanity:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-secondary-600">Loading blog posts...</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-secondary-600">No blog posts found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary-900">Blog</h1>
                <p className="text-secondary-600 max-w-2xl mx-auto">
                    Thoughts, tutorials, and insights about web development and design.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post, index) => (
                    <motion.article
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        {post.slug?.current && (
                            <Link to={`/blog/${post.slug.current}`} className="block">
                                {post.mainImage?.asset?.url && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.mainImage.asset.url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center space-x-4 mb-4 text-sm text-secondary-500">
                                        <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
                                        {post.readTime && (
                                            <>
                                                <span className="mx-2">•</span>
                                                <span>{post.readTime}</span>
                                            </>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold text-secondary-900 mb-2 hover:text-primary-600 transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <div className="flex items-center text-primary-600 font-medium">
                                        Read more
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </motion.article>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
